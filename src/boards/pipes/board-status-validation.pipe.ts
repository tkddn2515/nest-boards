import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../enum/board-status.enum";

export class BoardStatusValidationPipe implements PipeTransform {

  readonly StatusOptions = [
    BoardStatus.PUBLIC,
    BoardStatus.PRIVATE
  ]

  transform(value: any) {
    value = value.toUpperCase();
    if(!this.isStatusOption(value)) {
      throw new BadRequestException(`${value} isn't in the status options`);
    }
    return value;
  }

  private isStatusOption(value) {
    return this.StatusOptions.includes(value);
  }
}