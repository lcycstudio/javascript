## Section 04: Article Module

#### Table of Contents

- Creating article module
- Creating article method
- Polishing create article
- Get article by slug
- Deleting the article
- Updating an article
- Creating feed
- Liking articles
- Disliking articles

### Creating article module

#### Single Article

```json
{
  "article": {
    "slug": "how-to-train-your-dragon",
    "title": "How to train your dragon",
    "description": "Ever wonder how?",
    "body": "It takes a Jacobian",
    "tagList": ["dragons", "training"],
    "createdAt": "2016-02-18T03:22:56.637Z",
    "updatedAt": "2016-02-18T03:48:35.824Z",
    "favorited": false,
    "favoritesCount": 0,
    "author": {
      "username": "jake",
      "bio": "I work at statefarm",
      "image": "https://i.stack.imgur.com/xHWG8.jpg",
      "following": false
    }
  }
}
```

```ts
import { Controller, Post } from '@nestjs/common';
import { ArticleService } from './article.service';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @Post()
  async create() {
    return this.articleService.createArticle();
  }
}
```

`article.module.ts`

```ts
import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';

@Module({
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
```

`article.service.ts`

```ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class ArticleService {
  async createArticle() {
    return 'createArticle from service';
  }
}
```

`article.entity.ts`

```ts
import { BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'articles' })
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  slug: string;

  @Column()
  title: string;

  @Column({ default: '' })
  description: string;

  @Column({ default: '' })
  body: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updatedAt: Date;

  @Column('simple-array')
  tagList: string[];

  @Column({ default: 0 })
  favoritesCount: number;

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }
}
```

```bash
yarn db:create src/migrations/CreaetArticles
yarn db:migrate
```

### Creating article method

#### Create Article

`POST /api/articles`

Example request body:

```json
{
  "article": {
    "title": "How to train your dragon",
    "description": "Ever wonder how?",
    "body": "You have to believe",
    "tagList": ["reactjs", "angularjs", "dragons"]
  }
}
```

Authentication required, will return [Article](#single-article)

Required fields: `title`, `description`, `body`

Optional fields: `tagList` as an array of Strings

`article.entity.ts`

```ts
@Entity({ name: 'articles' })
export class ArticleEntity {
  //...
  @ManyToOne(() => UserEntity, (user) => user.articles)
  author: UserEntity;
}
```

```bash
yarn db:create src/migrations/AddRelationsBetweenArticleAndUser
yarn db:migrate
```

`createArticle.dto.ts`

```ts
import { IsNotEmpty } from 'class-validator';

export class CreateArticleDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  readonly body: string;

  readonly tagList?: string[];
}
```

`article.controller.ts`

```ts
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @Post()
  @UseGuards(AuthGuard)
  async create(
    @User() currentUser: UserEntity,
    @Body('article') createArticleDto: CreateArticleDto
  ): Promise<any> {
    return await this.articleService.createArticle(
      currentUser,
      createArticleDto
    );
  }
}
```

`article.service.ts`

```ts
import { UserEntity } from '@app/user/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ArticleEntity } from './article.entity';
import { CreateArticleDto } from './dto/createArticle.dto';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>
  ) {}

  async createArticle(
    currentUser: UserEntity,
    createArticleDto: CreateArticleDto
  ): Promise<ArticleEntity> {
    const article = new ArticleEntity();
    Object.assign(article, createArticleDto);
    if (!article.tagList) {
      article.tagList = [];
    }

    article.slug = 'fooo';

    article.author = currentUser;

    return await this.articleRepository.save(article);
  }
}
```

`article.module.ts`

```ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleController } from './article.controller';
import { ArticleEntity } from './article.entity';
import { ArticleService } from './article.service';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity])],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
```

Turn column view into row view

```postgres
\x
```

### Polishing create article

`article/types/articleResponse.interface.ts`

```ts
import { ArticleEntity } from '../article.entity';

export interface ArticleResponseInterface {
  article: ArticleEntity;
}
```

`article.controller.ts`

```ts
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @Post()
  @UseGuards(AuthGuard)
  async create(
    @User() currentUser: UserEntity,
    @Body('article') createArticleDto: CreateArticleDto
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.createArticle(
      currentUser,
      createArticleDto
    );
    return this.articleService.buildArticleResponse(article);
  }
}
```

```bash
yarn add slugify
```

`article.service.ts`

```ts
@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>
  ) {}

  async createArticle(
    currentUser: UserEntity,
    createArticleDto: CreateArticleDto
  ): Promise<ArticleEntity> {
    const article = new ArticleEntity();
    Object.assign(article, createArticleDto);
    if (!article.tagList) {
      article.tagList = [];
    }

    article.slug = this.getSlug(createArticleDto.title);

    article.author = currentUser;

    return await this.articleRepository.save(article);
  }

  buildArticleResponse(article: ArticleEntity): ArticleResponseInterface {
    return { article };
  }

  // create a unique string using the random function for slug
  private getSlug(title: string): string {
    return (
      slugify(title, { lower: true }) +
      '-' +
      ((Math.random() * Math.pow(36, 6)) | 0).toString(36)
    );
  }
}
```

### Get article by slug

#### Get Article

`GET /api/articles/:slug`

No authentication required, will return [Article](#single-article)

`article.controller.ts`

```ts
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @Get(':slug')
  async getSingleArticle(
    @Param('slug') slug: string
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.findBySlug(slug);
    return this.articleService.buildArticleResponse(article);
  }
}
```

`article.service.ts`

```ts
@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>
  ) {}

  // ...
  async findBySlug(slug: string): Promise<ArticleEntity> {
    return await this.articleRepository.findOne({ where: { slug } });
  }
}
```

### Deleting the article

#### Delete Article

`DELETE /api/articles/:slug`

Authentication required

`article.controller.ts`

```ts
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  // ...
  @Delete(':slug')
  @UseGuards(AuthGuard)
  async deleteArticle(
    @User('id') currentUserId: number,
    @Param('slug') slug: string
  ) {
    return await this.articleService.deleteArticle(slug, currentUserId);
  }
}
```

`article.service.ts`

```ts
@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>
  ) {}
  // ...
  async deleteArticle(
    slug: string,
    currentUserId: number
  ): Promise<DeleteResult> {
    const article = await this.findBySlug(slug);

    if (!article) {
      throw new HttpException('Article does not exist', HttpStatus.NOT_FOUND);
    }

    if (article.author.id !== currentUserId) {
      throw new HttpException('You are not an author', HttpStatus.FORBIDDEN);
    }

    return await this.articleRepository.delete({ slug });
  }
}
```

`article.entity.ts`

```ts
import { UserEntity } from '@app/user/user.entity';
import {
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'articles' })
export class ArticleEntity {
  // ...
  @ManyToOne(() => UserEntity, (user) => user.articles, { eager: true })
  author: UserEntity;
}
```

```bash
yarn db:migrate
```

### Updating an article

#### Update Article

`PUT /api/articles/:slug`

Example request body:

```json
{
  "article": {
    "title": "Did you train your dragon?"
  }
}
```

Authentication required, returns the updated [Article](#single-article)

Optional fields: `title`, `description`, `body`

The slug also gets updated when the `title` is changed

`article.controller.ts`

```ts
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  // ...
  @Put(':slug')
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  async updateArticle(
    @User('id') currentUserId: number,
    @Param('slug') slug: string,
    @Body('article') updateArticleDto: CreateArticleDto
  ) {
    const article = await this.articleService.updateArticle(
      slug,
      updateArticleDto,
      currentUserId
    );
    return await this.articleService.buildArticleResponse(article);
  }
}
```

`article.service.ts`

```ts
@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>
  ) {}

  // ...
  async updateArticle(
    slug: string,
    updateArticleDto: CreateArticleDto,
    currentUserId: number
  ): Promise<ArticleEntity> {
    const article = await this.findBySlug(slug);

    if (!article) {
      throw new HttpException('Article does not exist', HttpStatus.NOT_FOUND);
    }

    if (article.author.id !== currentUserId) {
      throw new HttpException('You are not an author', HttpStatus.FORBIDDEN);
    }

    Object.assign(article, updateArticleDto);

    return await this.articleRepository.save(article);
  }
}
```

Postman Update Article

`PUT http://localhost:3000/articles/fooo`

```json
{
  "article": {
    "title": "bar desc",
    "description": "something",
    "body": "some body"
  }
}
```

### Creating feed

#### Multiple Articles

```json
{
  "articles": [
    {
      "slug": "how-to-train-your-dragon",
      "title": "How to train your dragon",
      "description": "Ever wonder how?",
      "body": "It takes a Jacobian",
      "tagList": ["dragons", "training"],
      "createdAt": "2016-02-18T03:22:56.637Z",
      "updatedAt": "2016-02-18T03:48:35.824Z",
      "favorited": false,
      "favoritesCount": 0,
      "author": {
        "username": "jake",
        "bio": "I work at statefarm",
        "image": "https://i.stack.imgur.com/xHWG8.jpg",
        "following": false
      }
    },
    {
      "slug": "how-to-train-your-dragon-2",
      "title": "How to train your dragon 2",
      "description": "So toothless",
      "body": "It a dragon",
      "tagList": ["dragons", "training"],
      "createdAt": "2016-02-18T03:22:56.637Z",
      "updatedAt": "2016-02-18T03:48:35.824Z",
      "favorited": false,
      "favoritesCount": 0,
      "author": {
        "username": "jake",
        "bio": "I work at statefarm",
        "image": "https://i.stack.imgur.com/xHWG8.jpg",
        "following": false
      }
    }
  ],
  "articlesCount": 2
}
```

#### List Articles

`GET /api/articles`

Returns most recent articles globally by default, provide tag, author or
favorited query parameter to filter results

Query Parameters:

Filter by tag: `?tag=AngularJS`

Filter by author: `?author=jake`

Favorited by user: `?favorited=jake`

Limit number of articles (default is 20): `?limit=20`

Offset/skip number of articles (default is 0): `?offset=0`

Authentication optional, will return [multiple articles](#multiple-articles),
ordered by most recent first

#### QueryBuilder

[What is QueryBuilder](https://github.com/typeorm/typeorm/blob/master/docs/select-query-builder.md#what-is-querybuilder)

`QueryBuilder` is one of the most powerful features of TypeORM - it allows you
to build SQL queries using elegant and convenient syntax, execute them and get
automatically transformed entities.

Simple example of `QueryBuilder`:

```ts
const firstUser = await dataSource
  .getRepository(User)
  .createQueryBuilder('user')
  .where('user.id = :id', { id: 1 })
  .getOne();
```

It builds the following SQL query:

```sql
SELECT
    user.id as userId,
    user.firstName as userFirstName,
    user.lastName as userLastName
FROM users user
WHERE user.id = 1
```

and returns you an instance of `User`:

```ts
User {
    id: 1,
    firstName: "Timber",
    lastName: "Saw"
}
```

`article.controller.ts`

```ts
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  async findAll(
    @User('id') currentUserId: number,
    @Query() query: any
  ): Promise<ArticlesResponseInterface> {
    return await this.articleService.findAll(currentUserId, query);
  }
}
```

`articleResponse.interface.ts`

```ts
import { ArticleEntity } from '../article.entity';

export interface ArticlesResponseInterface {
  articles: ArticleEntity[];
  articlesCount: number;
}
```

`article.service.ts`

```ts
@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async findAll(
    currentUserId: number,
    query: any
  ): Promise<ArticlesResponseInterface> {
    const queryBuilder = getRepository(ArticleEntity)
      .createQueryBuilder('articles')
      .leftJoinAndSelect('articles.author', 'author');

    // Filter by tag
    if (query.tag) {
      queryBuilder.andWhere('articles.tagList LIKE :tag', {
        tag: `%${query.tag}`, // % is needed from both sides for substring search
      });
    }

    // Filter by author
    if (query.author) {
      const author = await this.userRepository.findOne({
        username: query.author,
      });
      queryBuilder.andWhere('articles.authorId = :id', {
        id: author.id,
      });
    }

    // Order by createdAt
    queryBuilder.orderBy('articles.createdAt', 'DESC');

    const articlesCount = await queryBuilder.getCount();

    // Filter by limit
    if (query.limit) {
      queryBuilder.limit(query.limit);
    }

    // Filter by offset
    if (query.offset) {
      queryBuilder.offset(query.offset);
    }

    const articles = await queryBuilder.getMany();

    return { articles, articlesCount };
  }
}
```

`article.module.ts`

```ts
@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity, UserEntity])],
  controllers: [ArticleController],
  providers: [ArticleService],
})
export class ArticleModule {}
```

### Liking articles

#### Favorite Article

`POST /api/articles/:slug/favorite`

Authentication required, returns the [Article](#single-article)

No additional parameters required

#### What are many-to-many relations

Many-to-many is a relation where A contains multiple instances of B, and B
contains multiple instances of A. Let's take for example `Question` and
`Category` entities. A question can have multiple categories, and each category
can have multiple questions.

```ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
```

```ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Category } from './Category';

@Entity()
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  text: string;

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[];
}
```

`@JoinTable()` is required for `@ManyToMany` relations. You must put
`@JoinTable` on one (owning) side of relation.

This example will produce following tables:

```sql
+-------------+--------------+----------------------------+
|                        category                         |
+-------------+--------------+----------------------------+
| id          | int(11)      | PRIMARY KEY AUTO_INCREMENT |
| name        | varchar(255) |                            |
+-------------+--------------+----------------------------+

+-------------+--------------+----------------------------+
|                        question                         |
+-------------+--------------+----------------------------+
| id          | int(11)      | PRIMARY KEY AUTO_INCREMENT |
| title       | varchar(255) |                            |
| text        | varchar(255) |                            |
+-------------+--------------+----------------------------+

+-------------+--------------+----------------------------+
|              question_categories_category               |
+-------------+--------------+----------------------------+
| questionId  | int(11)      | PRIMARY KEY FOREIGN KEY    |
| categoryId  | int(11)      | PRIMARY KEY FOREIGN KEY    |
+-------------+--------------+----------------------------+
```

`user.entity.ts`

```ts
import {
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { hash } from 'bcrypt';
import { ArticleEntity } from '@app/article/article.entity';

@Entity({ name: 'users' })
export class UserEntity {
  // ...
  @ManyToMany(() => ArticleEntity)
  @JoinTable()
  favorites: ArticleEntity[];
}
```

```bash
yarn db:create src/migrations/AddFavoritesRelationsBetweenArticleAndUser
yarn db:migrate
```

`article.controller.ts`

```ts
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  // ...
  @Post(':slug/favorite')
  @UseGuards(AuthGuard)
  async addArticleToFavorites(
    @User('id') currentUserId: number,
    @Param('slug') slug: string
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.addArticleToFavorites(
      slug,
      currentUserId
    );
    return this.articleService.buildArticleResponse(article);
  }
}
```

```ts
@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  // ...
  async addArticleToFavorites(
    slug: string,
    userId: number
  ): Promise<ArticleEntity> {
    const article = await this.findBySlug(slug);
    const user = await this.userRepository.findOne(userId, {
      relations: ['favorites'],
    });

    const isNotFavorited =
      user.favorites.findIndex(
        (articleInFavorites) => articleInFavorites.id === article.id
      ) === -1;

    if (isNotFavorited) {
      user.favorites.push(article);
      article.favoritesCount++;
      await this.userRepository.save(user);
      await this.articleRepository.save(article);
    }

    return article;
  }
}
```

### Disliking articles

#### Unfavorite Article

`DELETE /api/articles/:slug/favorite`

Authentication required, returns the [Article](#single-article)

No additional parameters required

`article.controller.ts`

```ts
@Controller('articles')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  // ...
  @Delete(':slug/favorite')
  @UseGuards(AuthGuard)
  async deleteArticleFromFavorites(
    @User('id') currentUserId: number,
    @Param('slug') slug: string
  ): Promise<ArticleResponseInterface> {
    const article = await this.articleService.deleteArticleFromFavorites(
      slug,
      currentUserId
    );
    return this.articleService.buildArticleResponse(article);
  }
}
```

`article.service.ts`

```ts
@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async deleteArticleFromFavorites(
    slug: string,
    userId: number
  ): Promise<ArticleEntity> {
    const article = await this.findBySlug(slug);
    const user = await this.userRepository.findOne(userId, {
      relations: ['favorites'],
    });

    const articleIndex = user.favorites.findIndex(
      (articleInFavorites) => articleInFavorites.id === article.id
    );

    if (articleIndex >= 0) {
      user.favorites.splice(articleIndex, 1);
      article.favoritesCount--;
      await this.userRepository.save(user);
      await this.articleRepository.save(article);
    }

    return article;
  }
}
```

`article.service.ts`

```ts
@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async findAll(
    currentUserId: number,
    query: any
  ): Promise<ArticlesResponseInterface> {
    const queryBuilder = getRepository(ArticleEntity)
      .createQueryBuilder('articles')
      .leftJoinAndSelect('articles.author', 'author');

    if (query.tag) {
      queryBuilder.andWhere('articles.tagList LIKE :tag', {
        tag: `%${query.tag}`,
      });
    }

    // ...
    if (query.favorited) {
      const author = await this.userRepository.findOne(
        {
          username: query.favorited,
        },
        { relations: ['favorites'] }
      );
      const ids = author.favorites.map((el) => el.id);

      if (ids.length > 0) {
        queryBuilder.andWhere('articles.id IN (:...ids)', { ids });
      } else {
        queryBuilder.andWhere('1=0'); // return an empty array with a false statement
      }
    }
  }
}
```

Return the field `favourited` in [Article](#single-article)

```json
"articles": { "favourited": false }
```

`article.service.ts`

```ts
@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(ArticleEntity)
    private readonly articleRepository: Repository<ArticleEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {}

  async findAll(
    currentUserId: number,
    query: any
  ): Promise<ArticlesResponseInterface> {
    const queryBuilder = getRepository(ArticleEntity)
      .createQueryBuilder('articles')
      .leftJoinAndSelect('articles.author', 'author');

    // ...
    let favoriteIds: number[] = [];

    if (currentUserId) {
      const currentUser = await this.userRepository.findOne(currentUserId, {
        relations: ['favorites'],
      });
      favoriteIds = currentUser.favorites.map((favorite) => favorite.id);
    }

    const articles = await queryBuilder.getMany();
    const articlesWithFavorited = articles.map((article) => {
      const favorited = favoriteIds.includes(article.id);
      return { ...article, favorited };
    });
  }
}
```

`types/article.type.ts`

```ts
import { ArticleEntity } from '../article.entity';

export type ArticleType = Omit<ArticleEntity, 'updateTimestamp'>;
```

`types/articleResponse.interface.ts`

```ts
import { ArticleEntity } from '../article.entity';

export interface ArticleResponseInterface {
  article: ArticleEntity;
}
```
