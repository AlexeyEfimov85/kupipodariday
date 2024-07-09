import { Injectable } from '@nestjs/common';
import { Offer } from './entities/offer.entities';
import { FindManyOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOfferDto } from './dto/create-offer.dto';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { WishesService } from 'src/wishes/wishes.service';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offersRepository: Repository<Offer>,
    private usersService: UsersService,
    private wishesService: WishesService,
  ) {}
  async createOffer(
    createOfferDto: CreateOfferDto,
    user: User,
  ): Promise<Offer> {
    const item = await this.wishesService.findWish(createOfferDto.itemId);
    const offer = await this.offersRepository.save({
      ...createOfferDto,
      user,
      item,
    });
    return offer;
  }

  async findOffers(option: FindManyOptions<Offer>): Promise<Offer[]> {
    return await this.offersRepository.find(option);
  }
}
