const WebSocket = require('ws')

const SocketMessageTypes = {
  QUERY_LATEST: 0,
  QUERY_ALL: 1,
  RESPONSE_BLOCKCHAIN: 2,
}

class BlockPeers {
  constructor(server, blockchain) {
    this.peers = []
    this.server = server
    this.blockchain = blockchain
    this.server.on('connection', peer => this.initializeConnection(peer))
  }

  initializeConnection(peer) {
    this.peers.push(peer)
    this.initMessageHandler(peer)
    init.initErrorHandler(peer)
    this.write(peer, queryChainLengthMsg())
  }

  initMessageHandler(peer) {
    peer.on('message', data => {
      const message = JSON.parse(data)
      console.log(`Received message ${JSON.stringify(message, null, 2)}`)
      switch (message.type) {
        case SocketMessageTypes.QUERY_LATEST:
          this.write(peer, this.responseLatestMsg())
          break
        case SocketMessageTypes.QUERY_ALL:
          this.write(peer, responseChainMsg())
          break
        case SocketMessageTypes.RESPONSE_BLOCKCHAIN:
          this.handleBlockchainResponse(message)
          break
      }
    })
  }

  handleBlockchainResponse(message) {
    const newChain = JSON.parse(message.data)
    if (newChain.length > this.blockchain.length) {
      console.log('Received blockchain is longer than current blockchain')
      this.blockchain.replaceChain(newChain)
    } else {
      console.log('received blockchain is not longer than current blockchain. Do nothing');
    }
  }

  removePeer(peer) {
    console.log(`removing peer from network: ${peer.url}`)
    this.peers.splice(this.peers.indexOf(peer), 1)
  }

  initErrorHandler(peer) {
    peer.on('close', () => this.removePeer(peer))
    peer.on('error', () => this.removePeer(peer))
  }

  queryChainLengthMsg() {
    return {
      type: SocketMessageTypes.QUERY_LATEST
    }
  }

  queryAllMsg() {
    return {
      type: SocketMessageTypes.QUERY_ALL
    }
  }

  responseChainMsg(){
    return {
      type: SocketMessageTypes.RESPONSE_BLOCKCHAIN,
      data: JSON.stringify(this.blockchain)
    }
  }

  responseLatestMsg() {
    return {
      type: SocketMessageTypes.RESPONSE_BLOCKCHAIN,
      data: JSON.stringify([
        this.blockchain.getLatestBlock()
      ])
    }
  }

  write(peer, message) {
    peer.send(JSON.stringify(message))
  }

  broadcast(message) {
    this.peers.forEach(peer => write(peer, message))
  }
}

module.exports = BlockPeers
