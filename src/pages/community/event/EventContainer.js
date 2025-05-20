import React from 'react';
import EventBannerContainer from './banner/EventBannerContainer';
import EventPostListContainer from './postList/EventPostListContainer';

const EventContainer = () => {
    return (
        <div>
          <EventBannerContainer />
          <EventPostListContainer />
        </div>
      );
};

export default EventContainer;