import { IsString, IsInt, IsOptional } from 'class-validator';

export class getMessageDTO {
  
  @IsInt()
  userId!: number;   // 內容與 producer DTO 完全相同。 但前輩建議即使內容相似也不要共用 dto，會造成維護地獄。
  // 最多就是抽一個共用的 value object。 推薦是小型的，只包含絕對必要，絕對不會更改的欄位。 
  // 避免過度耦合造成的麻煩。 但我這兩個 dto 已經很小了，我就不過度設計。
  @IsInt()
  roomId!: number

  @IsString()
  content!: string;

}
