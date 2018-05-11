const TYPES = {
    App: Symbol.for('APP'),
    IRentalService: Symbol.for('IRentalService'),
    MessagePublisherProvider: Symbol.for('MessagePublisherProvider'),
    MessageHandlerProvider: Symbol.for('MessageHandlerProvider'),
    IRentalRepository: Symbol.for('IRentalRepository'),
    MongoDbClient: Symbol.for('MongoDbClient'),
    RabbitMQChannel: Symbol.for('RabbitMQChannel'),
    MessageHandler: Symbol.for('MessageHandler')
  };

export { TYPES };
