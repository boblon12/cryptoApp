/* eslint-disable comma-dangle */
class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  handleOptions = (options) => {
    const message = this.createChatBotMessage(
      'В данный момент я могу только выполнять эти функции ;(',
      {
        widget: 'options',
        loading: true,
        withAvatar: true,
        terminateLoading: true,
        ...options,
      }
    );

    this.addMessageToState(message);
  };

  handleFirstdCurrencyChoice = () => {
    const message = this.createChatBotMessage(
      'Выбери первую валюту которую хочешь обменять',
      {
        widget: 'FirstCurrencyExcnahge',
        loading: true,
        terminateLoading: true,
      }
    );

    this.addMessageToState(message);
  };

  handleNewChoice = () => {
    const message = this.createChatBotMessage(
      'Круто! Выбери новую валюту чтобы узнать актуальный курс',
      {
        widget: 'FirstCurrencyExcnahge',
        loading: true,
        terminateLoading: true,
      }
    );

    this.addMessageToState(message);
  };

  handleSecondCurrencyChoice = (firstCurrency) => {
    const message = this.createChatBotMessage(
      `Круто. Ты хочешь обменять ${firstCurrency} в...`,
      {
        widget: 'SecondCurrencyExcnahge',
        loading: true,
        terminateLoading: true,
      }
    );
    this.setState((state) => ({
      ...state,
      firstCurrency,
      messages: [...state.messages, message],
    }));
  };

  handleCurrencyExchangeResult = (secondCurrency) => {
    const message = this.createChatBotMessage(
      `Ты выбрал ${secondCurrency}. Подожди секундочку :)`,
      {
        widget: 'ExchangeResult',
        loading: true,
        terminateLoading: true,
      }
    );
    this.setState((state) => ({
      ...state,
      secondCurrency,
      messages: [...state.messages, message],
    }));
  };

  addMessageToState = (message) => {
    this.setState((state) => ({
      ...state,
      messages: [...state.messages, message],
    }));
  };
}

export default ActionProvider;
