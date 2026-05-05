import { Module } from "@nestjs/common"
import { PostsController } from "@/posts/posts.controller"
import { PostsService } from "@/posts/posts.service"
import { ModerationAdapter } from "@/posts/moderation.adapter"
import {
    LatestFeedSortStrategy,
    MostCommentedFeedSortStrategy,
    MostLikedFeedSortStrategy,
    RelevanceFeedSortStrategy,
} from "@/posts/strategies/feed-sort.strategy"
import { FeedSortContext } from "@/posts/strategies/feed-sort.context"

@Module({
    controllers: [PostsController],
    providers: [
        PostsService,
        ModerationAdapter,
        FeedSortContext,
        LatestFeedSortStrategy,
        MostLikedFeedSortStrategy,
        MostCommentedFeedSortStrategy,
        RelevanceFeedSortStrategy,
    ],
})
export class PostsModule {}