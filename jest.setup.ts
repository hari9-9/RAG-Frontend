import {TextDecoder as NodeTextDecoder, TextEncoder} from "util"
global.TextDecoder = NodeTextDecoder as typeof TextDecoder;
global.TextEncoder = TextEncoder
import "@testing-library/jest-dom";
