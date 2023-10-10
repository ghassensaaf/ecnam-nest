import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { GraphQLISODateTime, GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { AuthModule } from './auth/auth.module';
import {
  DateTimeResolver,
  EmailAddressResolver,
  NonEmptyStringResolver,
  PhoneNumberResolver,
} from 'graphql-scalars';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      typePaths: ['./**/*.graphql'],
      resolvers: {
        DateTime: DateTimeResolver,
        EmailAddress: EmailAddressResolver,
        PhoneNumber: PhoneNumberResolver,
        NonEmptyString: NonEmptyStringResolver,
      },
      subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': true,
      },
      context: ({ req, res }) => ({ req, res }), // Ensure you include res in the context
    }),
    // GraphQLModule.forRoot<ApolloDriverConfig>({
    //   driver: ApolloDriver,
    //   playground: false,
    //   plugins: [ApolloServerPluginLandingPageLocalDefault()],
    //   path: '/graphql',
    //   typePaths: ['./**/*.normal.graphql'],
    //   resolvers: {
    //     // DateTime: GraphQLISODateTime,
    //   },
    //   subscriptions: {
    //     'graphql-ws': true,
    //     'subscriptions-transport-ws': true,
    //   },
    // }),
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
