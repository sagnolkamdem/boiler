import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PayStub } from "src/entity/payStub.entity";
import { User } from "src/entity/person.entity";
import { Repository } from "typeorm";
import { CreatePayStubInput } from "./data/create-pay-stub.input";
import { CreatePayStubOutput } from "./data/create-pay-stub.output";

@Injectable()
export class CreatePayStubService {
  constructor(
    @InjectRepository(PayStub)
    private readonly payStubRepository: Repository<PayStub>,
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async create(
    createPayStubInput: CreatePayStubInput
  ): Promise<CreatePayStubOutput> {
    console.log(createPayStubInput.user.toString());

    try {
      const user = await this.userRepository.findOne({
        where: {
          id: createPayStubInput.user.toString(),
        },
      });

      const oldPayStub = await this.payStubRepository.findOne({
        where: {
          periodYear: createPayStubInput.periodYear,
          periodMonth: createPayStubInput.periodMonth,
          user: {
            id: createPayStubInput.user.toString(),
          },
        },
      });

      if (user && !oldPayStub) {
        if (createPayStubInput.periodYear.toString().length != 4) {
          return {
            message: "Incorrect year",
            statusCode: 400,
            payStub: null,
          };
        }

        const payStub = await this.payStubRepository.save(createPayStubInput);

        return {
          message: "Pay stub created successfully",
          statusCode: 201,
          payStub: await this.payStubRepository.findOne({
            where: {
              id: payStub.id,
            },
            relations: {
              user: true,
            },
          }),
        };
      } else {
        let message: string;
        !user
          ? (message = "User not found")
          : (message = "Pay stub of that month already exists");
        return {
          message: message,
          statusCode: 400,
          payStub: null,
        };
      }
    } catch (error) {
      console.log(error);

      return {
        message: 'An error occurred, please check your user!',
        statusCode: 500,
        payStub: null,
      };
    }
  }
}
