import { UserBaseDto } from "./base.dto";
import { OmitType } from "@nestjs/swagger";
import { CommonSearchResponseDto } from "../../../common/common-dto/src/search-response.dto";

export class UserWithPasswordResponseDto extends UserBaseDto {}
export class UserResponseDto extends OmitType(UserWithPasswordResponseDto, ["password"]) {}

export class UserSearchResponseDto extends CommonSearchResponseDto(UserResponseDto) {}
