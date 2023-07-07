'use client'

import { Abi, formatAbi, parseAbi } from 'abitype'
import { useReducer } from 'react'

import { highlight, languages } from 'prismjs'
import 'prismjs/components/prism-solidity'
import Editor from 'react-simple-code-editor'
import './code-theme.css'

const Textarea = ({
  type,
  value,
  onValueChange,
}: {
  type: 'Human Readable ABI' | 'JSON ABI'
  value: string
  onValueChange: (value: string) => void
}) => {
  const lang = type === 'Human Readable ABI' ? languages.sol : languages.js
  return (
    <div className="rounded-xl h-[500px] overflow-scroll w-full py-2 px-3 bg-neutral-900 border border-neutral-800">
      <span className="text-neutral-500 text-xs">{type}</span>
      <Editor
        value={value}
        onValueChange={onValueChange}
        highlight={(code) => highlight(code, lang, 'solidity')}
        // className="text-sm h-full oveflow-scroll"
        textareaClassName="outline-none"
        // preClassName="text-sm oveflow-scroll"
      />
    </div>
  )
}

const getJsonAbi = (value: string) => {
  try {
    let json = JSON.parse(value)
    if (!!json && typeof json === 'object') return json as Abi
    return false
  } catch {
    return false
  }
}

type AbiInput = { value: string; error?: string }
export default function Home() {
  const [values, onChange] = useReducer<(s: AbiInput[], a: [number, string]) => AbiInput[]>(
    (s, [i, value]) => {
      const other = !i ? 1 : 0
      s[i] = { value }
      try {
        const jsonAbi = getJsonAbi(value)
        const formatedAbi = jsonAbi
          ? formatAbi(jsonAbi)
          : JSON.stringify(parseAbi(value.split('\n')))
        s[other] = { value: formatedAbi }
      } catch {
        s[i].error = 'Invalid ABI'
        s[other] = { value: '' }
      }
      return [...s]
    },
    [{ value: '' }, { value: '' }],
  )
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 gap-4">
      <h1 className="text-2xl font-bold">Format ABI</h1>
      <div className="rounded-lg w-96 max-w-sm py-1 px-2 bg-neutral-900 border border-neutral-800">
        <input className="caret-neutral-700 outline-none w-full h-full bg-transparent resize-none border-none text-sm" />
      </div>

      <div className="flex flex-col gap-4 w-full justify-center max-w-3xl">
        <Textarea
          type="Human Readable ABI"
          onValueChange={(v) => onChange([0, v])}
          // error={values[0].error}
          value={values[0].value}
        />
        <Textarea type="JSON ABI" onValueChange={(v) => onChange([1, v])} value={values[1].value} />
      </div>
    </main>
  )
}

// [
//   {
//     "inputs": [

//     ],
//     "name": "ALREADY_INITIALIZED",
//     "type": "error"
//   },
//   {
//     "inputs": [

//     ],
//     "name": "AccountBalanceOverflow",
//     "type": "error"
//   },
//   {
//     "inputs": [

//     ],
//     "name": "ArrayLengthsMismatch",
//     "type": "error"
//   },
//   {
//     "inputs": [

//     ],
//     "name": "CALLER_NOT_FACTORY",
//     "type": "error"
//   },
//   {
//     "inputs": [

//     ],
//     "name": "DISPUTE_WINDOW_HAS_ELAPSED",
//     "type": "error"
//   },
//   {
//     "inputs": [

//     ],
//     "name": "DISPUTE_WINDOW_HAS_NOT_ELAPSED",
//     "type": "error"
//   },
//   {
//     "inputs": [

//     ],
//     "name": "EMERGENCY_WINDOW_HAS_NOT_ELAPSED",
//     "type": "error"
//   },
//   {
//     "inputs": [

//     ],
//     "name": "InsufficientBalance",
//     "type": "error"
//   },
//   {
//     "inputs": [

//     ],
//     "name": "MARKET_HAS_ALREADY_SETTLED",
//     "type": "error"
//   },
//   {
//     "inputs": [

//     ],
//     "name": "MARKET_HAS_BEEN_SETTLED",
//     "type": "error"
//   },
//   {
//     "inputs": [

//     ],
//     "name": "MARKET_HAS_NOT_BEEN_SETTLED",
//     "type": "error"
//   },
//   {
//     "inputs": [

//     ],
//     "name": "MUST_PROVIDE_NON_ZERO_AMOUNT",
//     "type": "error"
//   },
//   {
//     "inputs": [

//     ],
//     "name": "NONEXISTENT_QUOTE",
//     "type": "error"
//   },
//   {
//     "inputs": [

//     ],
//     "name": "NewOwnerIsZeroAddress",
//     "type": "error"
//   },
//   {
//     "inputs": [

//     ],
//     "name": "NoHandoverRequest",
//     "type": "error"
//   },
//   {
//     "inputs": [

//     ],
//     "name": "NotOwnerNorApproved",
//     "type": "error"
//   },
//   {
//     "inputs": [

//     ],
//     "name": "QUOTE_CANNOT_BE_REPLAYED",
//     "type": "error"
//   },
//   {
//     "inputs": [

//     ],
//     "name": "QUOTE_MUST_BE_MORE_ACCURATE",
//     "type": "error"
//   },
//   {
//     "inputs": [

//     ],
//     "name": "TRANSFER_WINDOW_ELAPSES_MATURITY",
//     "type": "error"
//   },
//   {
//     "inputs": [

//     ],
//     "name": "TRANSFER_WINDOW_HAS_ELAPSED",
//     "type": "error"
//   },
//   {
//     "inputs": [

//     ],
//     "name": "TransferToNonERC1155ReceiverImplementer",
//     "type": "error"
//   },
//   {
//     "inputs": [

//     ],
//     "name": "TransferToZeroAddress",
//     "type": "error"
//   },
//   {
//     "inputs": [

//     ],
//     "name": "Unauthorized",
//     "type": "error"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "internalType": "address",
//         "name": "owner",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "internalType": "address",
//         "name": "operator",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "internalType": "bool",
//         "name": "isApproved",
//         "type": "bool"
//       }
//     ],
//     "name": "ApprovalForAll",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "internalType": "uint256",
//         "name": "marketId",
//         "type": "uint256"
//       },
//       {
//         "indexed": false,
//         "internalType": "uint256",
//         "name": "amountOut",
//         "type": "uint256"
//       }
//     ],
//     "name": "EmergencyWithdrawal",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": false,
//         "internalType": "uint256",
//         "name": "amountOut",
//         "type": "uint256"
//       }
//     ],
//     "name": "FeeWithdrawal",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "internalType": "uint256",
//         "name": "marketId",
//         "type": "uint256"
//       },
//       {
//         "indexed": false,
//         "internalType": "address",
//         "name": "priceFeed",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "internalType": "uint256",
//         "name": "strike",
//         "type": "uint256"
//       },
//       {
//         "indexed": false,
//         "internalType": "uint256",
//         "name": "maturity",
//         "type": "uint256"
//       }
//     ],
//     "name": "MarketCreated",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "internalType": "uint256",
//         "name": "marketId",
//         "type": "uint256"
//       },
//       {
//         "indexed": true,
//         "internalType": "address",
//         "name": "caller",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "internalType": "uint256",
//         "name": "amount0",
//         "type": "uint256"
//       },
//       {
//         "indexed": false,
//         "internalType": "uint256",
//         "name": "amount1",
//         "type": "uint256"
//       }
//     ],
//     "name": "MarketEntered",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "internalType": "uint256",
//         "name": "marketId",
//         "type": "uint256"
//       },
//       {
//         "indexed": true,
//         "internalType": "address",
//         "name": "caller",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "internalType": "uint256",
//         "name": "amount0",
//         "type": "uint256"
//       },
//       {
//         "indexed": false,
//         "internalType": "uint256",
//         "name": "amount1",
//         "type": "uint256"
//       }
//     ],
//     "name": "MarketExited",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "internalType": "uint256",
//         "name": "marketId",
//         "type": "uint256"
//       },
//       {
//         "indexed": false,
//         "internalType": "uint256",
//         "name": "roundId",
//         "type": "uint256"
//       },
//       {
//         "indexed": false,
//         "internalType": "int256",
//         "name": "answer",
//         "type": "int256"
//       }
//     ],
//     "name": "MarketQuoted",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "internalType": "uint256",
//         "name": "marketId",
//         "type": "uint256"
//       },
//       {
//         "indexed": true,
//         "internalType": "address",
//         "name": "caller",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "internalType": "uint256",
//         "name": "amountIn",
//         "type": "uint256"
//       },
//       {
//         "indexed": false,
//         "internalType": "uint256",
//         "name": "amountOut",
//         "type": "uint256"
//       }
//     ],
//     "name": "MarketRedemption",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "internalType": "uint256",
//         "name": "marketId",
//         "type": "uint256"
//       },
//       {
//         "indexed": false,
//         "internalType": "uint256",
//         "name": "roundId",
//         "type": "uint256"
//       },
//       {
//         "indexed": false,
//         "internalType": "int256",
//         "name": "answer",
//         "type": "int256"
//       }
//     ],
//     "name": "MarketSettled",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "internalType": "address",
//         "name": "pendingOwner",
//         "type": "address"
//       }
//     ],
//     "name": "OwnershipHandoverCanceled",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "internalType": "address",
//         "name": "pendingOwner",
//         "type": "address"
//       }
//     ],
//     "name": "OwnershipHandoverRequested",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "internalType": "address",
//         "name": "oldOwner",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "internalType": "address",
//         "name": "newOwner",
//         "type": "address"
//       }
//     ],
//     "name": "OwnershipTransferred",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "internalType": "address",
//         "name": "operator",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "internalType": "address",
//         "name": "from",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "internalType": "address",
//         "name": "to",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "internalType": "uint256[]",
//         "name": "ids",
//         "type": "uint256[]"
//       },
//       {
//         "indexed": false,
//         "internalType": "uint256[]",
//         "name": "amounts",
//         "type": "uint256[]"
//       }
//     ],
//     "name": "TransferBatch",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": true,
//         "internalType": "address",
//         "name": "operator",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "internalType": "address",
//         "name": "from",
//         "type": "address"
//       },
//       {
//         "indexed": true,
//         "internalType": "address",
//         "name": "to",
//         "type": "address"
//       },
//       {
//         "indexed": false,
//         "internalType": "uint256",
//         "name": "id",
//         "type": "uint256"
//       },
//       {
//         "indexed": false,
//         "internalType": "uint256",
//         "name": "amount",
//         "type": "uint256"
//       }
//     ],
//     "name": "TransferSingle",
//     "type": "event"
//   },
//   {
//     "anonymous": false,
//     "inputs": [
//       {
//         "indexed": false,
//         "internalType": "string",
//         "name": "value",
//         "type": "string"
//       },
//       {
//         "indexed": true,
//         "internalType": "uint256",
//         "name": "id",
//         "type": "uint256"
//       }
//     ],
//     "name": "URI",
//     "type": "event"
//   },
//   {
//     "inputs": [

//     ],
//     "name": "accumulatedFees",
//     "outputs": [
//       {
//         "internalType": "uint256",
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "owner",
//         "type": "address"
//       },
//       {
//         "internalType": "uint256",
//         "name": "id",
//         "type": "uint256"
//       }
//     ],
//     "name": "balanceOf",
//     "outputs": [
//       {
//         "internalType": "uint256",
//         "name": "result",
//         "type": "uint256"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address[]",
//         "name": "owners",
//         "type": "address[]"
//       },
//       {
//         "internalType": "uint256[]",
//         "name": "ids",
//         "type": "uint256[]"
//       }
//     ],
//     "name": "balanceOfBatch",
//     "outputs": [
//       {
//         "internalType": "uint256[]",
//         "name": "balances",
//         "type": "uint256[]"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [

//     ],
//     "name": "cancelOwnershipHandover",
//     "outputs": [

//     ],
//     "stateMutability": "payable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "pendingOwner",
//         "type": "address"
//       }
//     ],
//     "name": "completeOwnershipHandover",
//     "outputs": [

//     ],
//     "stateMutability": "payable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "uint256",
//         "name": "marketId",
//         "type": "uint256"
//       }
//     ],
//     "name": "computeImpliedProbability",
//     "outputs": [
//       {
//         "internalType": "uint256",
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "uint256",
//         "name": "marketId",
//         "type": "uint256"
//       },
//       {
//         "internalType": "bool",
//         "name": "outcome",
//         "type": "bool"
//       }
//     ],
//     "name": "computeOutcomeROI",
//     "outputs": [
//       {
//         "internalType": "uint256",
//         "name": "roi",
//         "type": "uint256"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "priceFeed",
//         "type": "address"
//       },
//       {
//         "internalType": "uint96",
//         "name": "strike",
//         "type": "uint96"
//       },
//       {
//         "internalType": "uint64",
//         "name": "maturity",
//         "type": "uint64"
//       },
//       {
//         "internalType": "uint32",
//         "name": "transferWindow",
//         "type": "uint32"
//       },
//       {
//         "internalType": "uint32",
//         "name": "settleWindow",
//         "type": "uint32"
//       },
//       {
//         "internalType": "enum IContrastPair.Direction",
//         "name": "direction",
//         "type": "uint8"
//       }
//     ],
//     "name": "createMarket",
//     "outputs": [
//       {
//         "internalType": "uint256",
//         "name": "marketId",
//         "type": "uint256"
//       }
//     ],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "uint256",
//         "name": "marketId",
//         "type": "uint256"
//       },
//       {
//         "internalType": "uint256",
//         "name": "amount0",
//         "type": "uint256"
//       },
//       {
//         "internalType": "uint256",
//         "name": "amount1",
//         "type": "uint256"
//       }
//     ],
//     "name": "emergencyExit",
//     "outputs": [

//     ],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "uint256",
//         "name": "marketId",
//         "type": "uint256"
//       },
//       {
//         "internalType": "uint256",
//         "name": "amount0",
//         "type": "uint256"
//       },
//       {
//         "internalType": "uint256",
//         "name": "amount1",
//         "type": "uint256"
//       }
//     ],
//     "name": "enter",
//     "outputs": [

//     ],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "uint256",
//         "name": "marketId",
//         "type": "uint256"
//       },
//       {
//         "internalType": "uint256",
//         "name": "amount0",
//         "type": "uint256"
//       },
//       {
//         "internalType": "uint256",
//         "name": "amount1",
//         "type": "uint256"
//       }
//     ],
//     "name": "exit",
//     "outputs": [

//     ],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "uint256",
//         "name": "marketId",
//         "type": "uint256"
//       }
//     ],
//     "name": "idsForMarket",
//     "outputs": [
//       {
//         "internalType": "uint256",
//         "name": "id0",
//         "type": "uint256"
//       },
//       {
//         "internalType": "uint256",
//         "name": "id1",
//         "type": "uint256"
//       }
//     ],
//     "stateMutability": "pure",
//     "type": "function"
//   },
//   {
//     "inputs": [

//     ],
//     "name": "immutables",
//     "outputs": [
//       {
//         "internalType": "address",
//         "name": "asset",
//         "type": "address"
//       },
//       {
//         "internalType": "uint256",
//         "name": "quoteBondAmount",
//         "type": "uint256"
//       },
//       {
//         "internalType": "uint256",
//         "name": "quoteDisputeWindow",
//         "type": "uint256"
//       },
//       {
//         "internalType": "uint256",
//         "name": "emergencyWithdrawalWindow",
//         "type": "uint256"
//       }
//     ],
//     "stateMutability": "pure",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "_owner",
//         "type": "address"
//       }
//     ],
//     "name": "initialize",
//     "outputs": [

//     ],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "owner",
//         "type": "address"
//       },
//       {
//         "internalType": "address",
//         "name": "operator",
//         "type": "address"
//       }
//     ],
//     "name": "isApprovedForAll",
//     "outputs": [
//       {
//         "internalType": "bool",
//         "name": "result",
//         "type": "bool"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "uint256",
//         "name": "marketId",
//         "type": "uint256"
//       }
//     ],
//     "name": "markets",
//     "outputs": [
//       {
//         "components": [
//           {
//             "internalType": "contract IChainlinkAggregatorV3",
//             "name": "priceFeed",
//             "type": "address"
//           },
//           {
//             "internalType": "uint96",
//             "name": "exchangeRate",
//             "type": "uint96"
//           },
//           {
//             "internalType": "uint64",
//             "name": "maturity",
//             "type": "uint64"
//           },
//           {
//             "internalType": "uint64",
//             "name": "creation",
//             "type": "uint64"
//           },
//           {
//             "internalType": "uint96",
//             "name": "strike",
//             "type": "uint96"
//           },
//           {
//             "internalType": "uint32",
//             "name": "settleWindow",
//             "type": "uint32"
//           },
//           {
//             "internalType": "uint32",
//             "name": "transferWindow",
//             "type": "uint32"
//           },
//           {
//             "internalType": "uint80",
//             "name": "roundId",
//             "type": "uint80"
//           },
//           {
//             "internalType": "enum IContrastPair.Outcome",
//             "name": "outcome",
//             "type": "uint8"
//           },
//           {
//             "internalType": "enum IContrastPair.Direction",
//             "name": "direction",
//             "type": "uint8"
//           }
//         ],
//         "internalType": "struct IContrastPair.Market",
//         "name": "",
//         "type": "tuple"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [

//     ],
//     "name": "owner",
//     "outputs": [
//       {
//         "internalType": "address",
//         "name": "result",
//         "type": "address"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "pendingOwner",
//         "type": "address"
//       }
//     ],
//     "name": "ownershipHandoverExpiresAt",
//     "outputs": [
//       {
//         "internalType": "uint256",
//         "name": "result",
//         "type": "uint256"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [

//     ],
//     "name": "ownershipHandoverValidFor",
//     "outputs": [
//       {
//         "internalType": "uint64",
//         "name": "",
//         "type": "uint64"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "uint256",
//         "name": "marketId",
//         "type": "uint256"
//       },
//       {
//         "internalType": "uint80",
//         "name": "roundId",
//         "type": "uint80"
//       }
//     ],
//     "name": "price",
//     "outputs": [

//     ],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "uint256",
//         "name": "marketId",
//         "type": "uint256"
//       }
//     ],
//     "name": "quotes",
//     "outputs": [
//       {
//         "components": [
//           {
//             "internalType": "address",
//             "name": "quoter",
//             "type": "address"
//           },
//           {
//             "internalType": "uint80",
//             "name": "roundId",
//             "type": "uint80"
//           },
//           {
//             "internalType": "uint64",
//             "name": "creation",
//             "type": "uint64"
//           },
//           {
//             "internalType": "uint64",
//             "name": "inaccuracy",
//             "type": "uint64"
//           }
//         ],
//         "internalType": "struct IContrastPair.Quote",
//         "name": "",
//         "type": "tuple"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "uint256",
//         "name": "marketId",
//         "type": "uint256"
//       },
//       {
//         "internalType": "uint256",
//         "name": "amountIn",
//         "type": "uint256"
//       }
//     ],
//     "name": "redeem",
//     "outputs": [

//     ],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [

//     ],
//     "name": "renounceOwnership",
//     "outputs": [

//     ],
//     "stateMutability": "payable",
//     "type": "function"
//   },
//   {
//     "inputs": [

//     ],
//     "name": "requestOwnershipHandover",
//     "outputs": [

//     ],
//     "stateMutability": "payable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "from",
//         "type": "address"
//       },
//       {
//         "internalType": "address",
//         "name": "to",
//         "type": "address"
//       },
//       {
//         "internalType": "uint256[]",
//         "name": "ids",
//         "type": "uint256[]"
//       },
//       {
//         "internalType": "uint256[]",
//         "name": "amounts",
//         "type": "uint256[]"
//       },
//       {
//         "internalType": "bytes",
//         "name": "data",
//         "type": "bytes"
//       }
//     ],
//     "name": "safeBatchTransferFrom",
//     "outputs": [

//     ],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "from",
//         "type": "address"
//       },
//       {
//         "internalType": "address",
//         "name": "to",
//         "type": "address"
//       },
//       {
//         "internalType": "uint256",
//         "name": "id",
//         "type": "uint256"
//       },
//       {
//         "internalType": "uint256",
//         "name": "amount",
//         "type": "uint256"
//       },
//       {
//         "internalType": "bytes",
//         "name": "data",
//         "type": "bytes"
//       }
//     ],
//     "name": "safeTransferFrom",
//     "outputs": [

//     ],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "operator",
//         "type": "address"
//       },
//       {
//         "internalType": "bool",
//         "name": "isApproved",
//         "type": "bool"
//       }
//     ],
//     "name": "setApprovalForAll",
//     "outputs": [

//     ],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "uint256",
//         "name": "marketId",
//         "type": "uint256"
//       }
//     ],
//     "name": "settle",
//     "outputs": [

//     ],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "bytes4",
//         "name": "interfaceId",
//         "type": "bytes4"
//       }
//     ],
//     "name": "supportsInterface",
//     "outputs": [
//       {
//         "internalType": "bool",
//         "name": "result",
//         "type": "bool"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [

//     ],
//     "name": "totalMarkets",
//     "outputs": [
//       {
//         "internalType": "uint256",
//         "name": "",
//         "type": "uint256"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [

//     ],
//     "name": "totalMarketsOpen",
//     "outputs": [
//       {
//         "internalType": "uint256",
//         "name": "openMarkets",
//         "type": "uint256"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "account",
//         "type": "address"
//       }
//     ],
//     "name": "totalMarketsOpenForAccount",
//     "outputs": [
//       {
//         "internalType": "uint256",
//         "name": "openMarkets",
//         "type": "uint256"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "uint256",
//         "name": "id",
//         "type": "uint256"
//       }
//     ],
//     "name": "totalSupply",
//     "outputs": [
//       {
//         "internalType": "uint256",
//         "name": "supply",
//         "type": "uint256"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "newOwner",
//         "type": "address"
//       }
//     ],
//     "name": "transferOwnership",
//     "outputs": [

//     ],
//     "stateMutability": "payable",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "uint256",
//         "name": "id",
//         "type": "uint256"
//       }
//     ],
//     "name": "uri",
//     "outputs": [
//       {
//         "internalType": "string",
//         "name": "",
//         "type": "string"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   },
//   {
//     "inputs": [
//       {
//         "internalType": "address",
//         "name": "to",
//         "type": "address"
//       }
//     ],
//     "name": "withdrawFees",
//     "outputs": [
//       {
//         "internalType": "uint256",
//         "name": "amountOut",
//         "type": "uint256"
//       }
//     ],
//     "stateMutability": "nonpayable",
//     "type": "function"
//   }
// ]
