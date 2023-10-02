import { ExecutionContext, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { IS_PUBLIC_KEY } from "../decorators/public.decorator";
import { User } from "src/entities/user.entity";

@Injectable()
export class AtGuard extends AuthGuard("jwt") {
    constructor(private reflector: Reflector) {
        super();
    }

    //can avtivate se okine pre nego sto ti dopusti da udjes na rutu
    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass()
        ])

        if (isPublic) return true

        return super.canActivate(context)
    }
}