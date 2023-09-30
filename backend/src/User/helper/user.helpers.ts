export class ImageFile {
  readonly filename: string;
  readonly url: string;
}

export interface deleteMessage {
  userId?: string;
  profileId?: string;
  message: string;
}
