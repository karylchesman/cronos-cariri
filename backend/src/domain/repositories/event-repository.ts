import { Equal, Like, Repository } from 'typeorm';
import { AppDataSource } from '../../infra/typeORM/connection';
import { ORMEvent } from '../../infra/typeORM/entities/ORMEvent';
import { EventProps } from '../entities/event';
import { getWhereObject, ISearchObject } from '../utils/search-object';
import { EventRepositoryProtocol } from './interfaces/event-repository-protocol';

class EventRepository implements EventRepositoryProtocol {
    private eventRepository: Repository<ORMEvent>;

    constructor() {
        this.eventRepository = AppDataSource.getRepository(ORMEvent);
    }

    async save(event: EventProps) {
        const new_event = this.eventRepository.create(event);

        await this.eventRepository.save(new_event);

        return new_event;
    }

    async update(event: EventProps) {
        event.updated_at = new Date();

        await this.eventRepository.update(String(event.id), event);

        return event;
    }

    async find(event?: Partial<EventProps>) {
        const found_events = await this.eventRepository.find({
            where: event,
        });

        return found_events;
    }

    async findById(id: string) {
        const event = await this.eventRepository.findOne({
            where: {
                id,
            },
        });

        if (event) {
            return event;
        }

        return null;
    }

    async findByUrlPath(
        url_path: string,
        search_like: boolean
    ): Promise<EventProps[] | null> {
        const event = await this.eventRepository.find({
            where: {
                url_path:
                    search_like === true
                        ? Like(`%${url_path}`)
                        : Equal(url_path),
            },
        });

        if (event) {
            return event;
        }

        return null;
    }

    async search(
        search_params?: ISearchObject<EventProps>[] | string,
        page?: number,
        limit?: number,
        order_by?: keyof EventProps,
        order?: 'ASC' | 'DESC'
    ) {
        const query = this.eventRepository
            .createQueryBuilder('events')
            .select('events');

        if (search_params !== undefined) {
            if (typeof search_params === 'string') {
                query.where(`name LIKE :event_name`, {
                    event_name: `%${search_params}%`,
                });
            }

            if (Array.isArray(search_params)) {
                search_params.forEach((item, idx) => {
                    const search_object = getWhereObject(
                        item.operator,
                        item.key,
                        item.value,
                        'events'
                    );

                    if (idx === 0) {
                        query.where(
                            search_object.where_string,
                            search_object.value_param
                        );
                    } else {
                        query.andWhere(
                            search_object.where_string,
                            search_object.value_param
                        );
                    }
                });
            }
        }

        if (limit !== undefined && page !== undefined) {
            const skip = (page - 1) * limit;

            query.skip(skip);
            query.take(limit);
        }

        if (order_by !== undefined && order !== undefined) {
            query.addOrderBy(order_by, order);
        }

        const events_found = await query.getManyAndCount();

        return {
            events: events_found[0],
            registers: events_found[1],
        };
    }

    async deleteById(id: string) {
        await this.eventRepository.delete(id);

        return;
    }
}

export { EventRepository };
