import { useProfileContext } from 'contexts/ProfileContext';
import moment from 'moment';
import { Region } from 'pages/Profile/types/ProfileTypes';
import React from 'react';

// First Prop is the date nd time which needs to be converted according to time zone
// Second Prop is list of regions
// Third Prop is profile Info
// Fourth Prop is the date an time format
//Fifth Prop is to show time zone

export const getModifiedTime = (
  DateAndTime: Date | string,
  format: string,
  showTimeZone: boolean
) => {
  const { profileInfo, regions } = useProfileContext();
  if (moment(DateAndTime).isValid()) {
    const region: Region = React.useMemo(() => {
      return regions
        .filter((region: any) => region.region == profileInfo?.time_zone?.split('/')[0])
        .map((zones: any) => zones.time_zones)[0]
        ?.filter((zone: Region) => zone?.time_zone == profileInfo?.time_zone)[0];
    }, [profileInfo?.time_zone]);

    const updatedDateTimeAccordingToTimeZone = moment
      .utc(DateAndTime)
      .add(region?.offset, 'hours')
      .format(format);
    if (showTimeZone) {
      return updatedDateTimeAccordingToTimeZone + ` ${region?.time_zone}`;
    } else {
      return updatedDateTimeAccordingToTimeZone;
    }
  } else {
    return 'Unknown Time';
  }
};
