import { IsString, IsInt, IsOptional } from 'class-validator';

export class CreateMessageDTO {
  @IsInt()
  userId!: number;   // 用! 取消初始化檢查，因為值會來自 req.body

  @IsOptional()
  @IsInt()
  receiverId?: number;

  @IsString()
  content!: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsInt()
  roomId?: number;
}
