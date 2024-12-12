import { io } from "socket.io-client";
import { EnvConfig } from "../constants";
const socket = io(EnvConfig.API);
export default socket;
