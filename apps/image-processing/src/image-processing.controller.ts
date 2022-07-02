import { Controller, Get } from '@nestjs/common';
import { ImageProcessingService } from './image-processing.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { GeneratorType } from '@app/contracts';
import { IMAGE_RESIZE_EVENT, makeEvent } from '@app/events';

@Controller()
export class ImageProcessingController {
  constructor(
    private readonly imageProcessingService: ImageProcessingService,
  ) {}

  @MessagePattern(makeEvent(IMAGE_RESIZE_EVENT))
  async imageResize(@Payload() message: GeneratorType): Promise<void> {
    const buffer = await this.imageProcessingService.resize();
  }
}
