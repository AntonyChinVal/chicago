import {ApiResponse} from '@entities/Event';
import EventRepository, {PaginationParams} from '@repositories/EventRepository';
import {useInfiniteQuery} from '@tanstack/react-query';

type Input = {
  eventRepository: EventRepository;
};

const useEventsQuery = ({eventRepository}: Input) => {
  const {isFetching, isRefetching, hasNextPage, fetchNextPage, data} =
    useInfiniteQuery<ApiResponse>({
      queryKey: ['events'],
      initialPageParam: 1,
      queryFn: async ({pageParam = 1}) => {
        const params: PaginationParams = {
          page: pageParam as number,
          limit: 10,
        };
        return await eventRepository.getEvents(params);
      },
      getNextPageParam: lastPage => {
        if (!lastPage) {
          return undefined;
        }
        const nextPage = lastPage.pagination.current_page + 1;
        return nextPage;
      },
    });

  const loadMoreItems = () => {
    if (hasNextPage && !isRefetching && !isFetching) {
      fetchNextPage();
    }
  };

  const events = data?.pages.flatMap(page => page.data) ?? [];

  return {events, loadMoreItems};
};

export default useEventsQuery;
