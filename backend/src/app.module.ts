import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';

import { appConfig, databaseConfig, jwtConfig } from './config';
import { DatabaseModule } from './database/database.module';

// Common
import { AllExceptionsFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { RolesGuard } from './common/guards/roles.guard';

// Feature modules
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { LearnersModule } from './modules/learners/learners.module';
import { TrainersModule } from './modules/trainers/trainers.module';
import { ProgrammesModule } from './modules/programmes/programmes.module';
import { TasksModule } from './modules/tasks/tasks.module';
import { EvidenceModule } from './modules/evidence/evidence.module';
import { JournalsModule } from './modules/journals/journals.module';
import { ProgressModule } from './modules/progress/progress.module';
import { ScorecardModule } from './modules/scorecard/scorecard.module';
import { MessagesModule } from './modules/messages/messages.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { CoursesModule } from './modules/courses/courses.module';
import { EnrollmentsModule } from './modules/enrollments/enrollments.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { ReportsModule } from './modules/reports/reports.module';
import { AdminModule } from './modules/admin/admin.module';

// WebSocket
import { WebsocketModule } from './websocket/websocket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, databaseConfig, jwtConfig],
    }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
    DatabaseModule,
    AuthModule,
    UsersModule,
    LearnersModule,
    TrainersModule,
    ProgrammesModule,
    TasksModule,
    EvidenceModule,
    JournalsModule,
    ProgressModule,
    ScorecardModule,
    MessagesModule,
    NotificationsModule,
    CoursesModule,
    EnrollmentsModule,
    DashboardModule,
    ReportsModule,
    AdminModule,
    WebsocketModule,
  ],
  providers: [
    { provide: APP_FILTER, useClass: AllExceptionsFilter },
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    { provide: APP_INTERCEPTOR, useClass: ResponseInterceptor },
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    { provide: APP_GUARD, useClass: ThrottlerGuard },
  ],
})
export class AppModule {}
