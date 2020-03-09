import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { SwordsModule } from './swords/swords.module';
import { ShieldsModule } from './shields/shields.module';


@Module({

  imports: [TasksModule, SwordsModule, ShieldsModule],

})

export class AppModule {}
