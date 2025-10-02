import { useProfileContext } from '../contexts/ProfileContext';
import moment from 'moment';
import { Region } from '../pages/Profile/types/ProfileTypes';
import React from 'react';

function getStartAndEndTime() {
  const { profileInfo, regions } = useProfileContext();
  
  const region: Region | undefined = React.useMemo(() => {
    // Add null checks for regions and profileInfo
    if (!regions || !Array.isArray(regions) || !profileInfo?.time_zone) {
      return undefined;
    }

    const timeZoneRegion = profileInfo.time_zone.split('/')[0];
    
    return regions
      .filter((region: any) => region.region === timeZoneRegion)
      .map((zones: any) => zones.time_zones)[0]
      ?.filter((zone: Region) => zone?.time_zone === profileInfo.time_zone)[0];
  }, [profileInfo?.time_zone, regions]);

  const getStartTime = (daysDifference: number) => {
    // Use optional chaining and provide default offset (0) if region is undefined
    const offset = region?.offset || 0;
    return moment()
      .subtract(daysDifference, 'days')
      .add(offset, 'hours')
      .format('YYYY-MM-DD HH:mm:ss');
  };

  const getEndTime = () => {
    // Use optional chaining and provide default offset (0) if region is undefined
    const offset = region?.offset || 0;
    return moment().add(offset, 'hours').format('YYYY-MM-DD HH:mm:ss');
  };

  return {
    getStartTime,
    getEndTime,
  };
}

export default getStartAndEndTime;
