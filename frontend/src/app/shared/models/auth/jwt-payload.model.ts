import {JwtPayload} from "jwt-decode";

export interface JwtPayloadModel extends JwtPayload {
  username: string;
  roles: string[];
}
