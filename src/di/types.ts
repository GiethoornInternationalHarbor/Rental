const TYPES = {
    App: Symbol.for('APP'),
    IRentalService: Symbol.for('IRentalService'),    
    RentalRepositoryProvider: Symbol.for('RentalRepositoryProvider'),
    MessagePublisherProvider: Symbol.for("MessagePublisherProvider"),
    MessageHandlerProvider: Symbol.for("MessageHandlerProvider"),
    RabbitMQChannel: Symbol.for("RabbitMQChannel"),
    MessageHandler: Symbol.for("MessageHandler")
  };

export { TYPES };
