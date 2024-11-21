export class ChannelRack {
  #channels = [];
  #currentChannel = null;

  add(channel) {
    this.#channels.push(channel);
    if (this.#channels.length == 1) {
      this.#currentChannel = channel;
    }
  }

  getChannelCount() {
    return this.#channels.length;
  }

  getCurrentChannel() {
    return this.#currentChannel;
  }

  getChannelAt(index) {
    return this.#channels[index];
  }

  getChannelIndex(channel) {
    return this.#channels.findIndex(c => c === channel);
  }

  setCurrentChannel(currentChannel) {
    this.#currentChannel = currentChannel;
  }

  setCurrentChannelByIndex(index) {
    this.#currentChannel = this.#channels[index];
  }
}