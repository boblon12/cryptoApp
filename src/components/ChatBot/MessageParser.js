/* eslint-disable no-unused-vars */
class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    return this.actionProvider.handleOptions();
  }
}

export default MessageParser;
