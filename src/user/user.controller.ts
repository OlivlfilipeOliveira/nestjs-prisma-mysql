import { Body, Controller, Delete, Get, Patch, Post, Put, UseGuards, UseInterceptors } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import { UserService } from "./user.service";
import { ParamId } from "src/decorators/param-id.decorator";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/enums/role.enum";
import { RoleGuard } from "src/guards/role.guard";
import { AuthGuard } from "src/guards/auth.guard";
import { LogInterceptor } from "src/interceptors/log.interceptor";
import { ThrottlerGuard } from "@nestjs/throttler";

@UseInterceptors(LogInterceptor)
@Roles(Role.Admin)
@UseGuards(AuthGuard, RoleGuard)
@Controller("users")
export class UserController{

    constructor(private readonly userService: UserService){}
    
    //@UseInterceptors(LogInterceptor)]
    @Post()
    async create(@Body() data: CreateUserDTO){
        return this.userService.create(data);
    }

    @Get()
    async read(){
        return this.userService.list();
    }

    @Get(':id')
    async readOne(@ParamId() id: number){
        console.log(id);
        return this.userService.show(id);
    }

    @Put(':id')
    async update(@Body() data: UpdatePutUserDTO, @ParamId() id: number){
        return this.userService.update(id, data);
    }

    @Patch(':id')
    async updatePartial(@Body() data: UpdatePatchUserDTO, @ParamId() id: number){
        return this.userService.updatePartial(id, data);
    }

    @Delete(':id')
    async delete(@ParamId() id: number){
        return this.userService.delete(id);
    }
}
