import { classToPlain } from "class-transformer";
import { getCustomRepository } from "typeorm";
import { TagRepository } from "../repositories/TagRepository";

class ListTagsService {
    async execute() {
        const tagsRepository = getCustomRepository(TagRepository);

        const tags = await tagsRepository.find();

        return classToPlain(tags);
    }
}

export {ListTagsService}