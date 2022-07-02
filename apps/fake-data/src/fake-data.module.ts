import { Module } from '@nestjs/common';
import { FakeServiceController } from './fake-data.controller';
import { FakeServiceService } from './fake-data.service';

@Module({
  imports: [],
  controllers: [FakeServiceController],
  providers: [FakeServiceService],
})
export class FakeServiceModule {}
