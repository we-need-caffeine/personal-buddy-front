import React from 'react';
import EventBannerContainer from './banner/EventBannerContainer';
import EventPostListContainer from './postList/EventPostListContainer';

const EventContainer = () => {
    return (
        <div>
          이벤트 메인!
          <EventBannerContainer />
          <EventPostListContainer />
        </div>
      );
};

export default EventContainer;