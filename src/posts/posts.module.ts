import { Module } from "@nestjs/common"
import { PostsController } from "@/posts/posts.controller"
import { PostsService } from "@/posts/posts.service"
import { ModerationAdapter } from "@/posts/moderation.adapter"

@Module({
    controllers: [PostsController],
    providers: [PostsService, ModerationAdapter],
})
export class PostsModule {}
