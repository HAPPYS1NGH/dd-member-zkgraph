//@ts-ignore
import {
  Bytes,
  Block,
  Event,
  ByteArray,
  Address,
} from "@hyperoracle/zkgraph-lib"

var addr_Code = Bytes.fromHexString(
  "0xb24cd494faE4C180A89975F1328Eab2a7D5d8f11"
)
var addr_D4R = Bytes.fromHexString("0x25ed58c027921E14D86380eA2646E3a1B5C55A8b")
var esig_Transfer = Bytes.fromHexString(
  "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
)

export function handleBlocks(blocks: Block[]): Bytes {
  let events: Event[] = blocks[0].events

  // let ddMembers2: ByteArray = ByteArray.empty()
  let ddMembers: Address = Address.zero()

  for (let i = events.length - 1; i >= 0; i--) {
    if (
      (events[i].address == addr_Code || events[i].address == addr_D4R) &&
      events[i].esig == esig_Transfer
    ) {
      ddMembers = Address.fromString(events[i].topic1.toHexString())
      // ddMembers2.concat(ByteArray.fromHexString(events[i].topic2.toHexString()))
      // const topic2Bytes = Bytes.fromHexString(events[i].topic2.toHexString())
      // ddMembers = ddMembers.concat(topic2Bytes)
      // console.log("ddMembers: " + events[i].topic2.toHexString() + ddMembers)
      // ddMembers.concat(events[i].topic1)
      // console.log("ddMembers: " + events[i].topic2.toHexString())
    }
  }
  // let state = Bytes.fromByteArray(ddMembers2)
  // return state
  return ddMembers
}
