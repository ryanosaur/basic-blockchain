const express = require('express')
const bodyParser = require('body-parser')
const WebSocket = require('ws')

const Blockchain = require('./blockchain')

const httpPort = process.env.HTTP_PORT || 3001
const p2pPort = process.env.P2P_PORT || 6001
const initialPeers = process.env.PEERS ? process.env.PEERS.split(',') : []

const sockets = []
const SocketMessageTypes = {
  QUERY_LATEST: 0,
  QUERY_ALL: 1,
  RESPONSE_BLOCKCHAIN: 2,
}

const blockchain = new Blockchain()

const initializeHttpServer = () => {
  const app = express()
  app.use(bodyParser.json())

  app.get('/blocks', (req, res) => res.json(blockchain.chain))
  app.get('/', (req, res) => res.send(`<pre>${JSON.stringify(blockchain.chain, null, 2)}</pre>`))
  app.get('/mine/:user', (req, res) => {
    blockchain.minePendingTransactions(req.params.user || 'ryano')
    res.send(`Block Mined: ${JSON.stringify(blockchain.getLatestBlock(), null, 2)}`)
  });

  app.listen(httpPort, () => console.log(`Listening http on port: ${httpPort}`))
}

initializeHttpServer()
