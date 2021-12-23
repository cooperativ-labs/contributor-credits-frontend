import cn from 'classnames';
import React from 'react';
import RoundedImage from '@src/components/RoundedImage/RoundedImage';

export interface UserInfoProps {
  className?: string;
  displayName: string;
  title: string;
  thumbnail: string;
  compact?: boolean;
  bio?: string;
}

const UserInfo: React.FunctionComponent<UserInfoProps> = ({
  displayName,
  title,
  thumbnail,
  compact,
  bio,
  ...props
}) => {
  const { className, ...rest } = props;
  const thumbnailClasses = () => {
    const classes = ['flex-shrink-0'];
    if (bio && !compact) {
      classes.push('md:h-12 md:w-12 lg:w-16 lg:h-16');
    } else if (!bio && !compact) {
      classes.push('md:h-16 md:w-16 lg:w-20 lg:h-20');
    }
    if (compact) {
      classes.push('h-16 w-16 md:h-12 md:w-12 lg:h-20 lg:w-20');
    } else {
      classes.push('h-20 w-20');
    }
    return classes;
  };

  return (
    <section data-test="molecule-user-info" className={cn(className, 'flex items-center w-full')} {...rest}>
      <div
        className={cn(
          bio && 'items-center md:items-start',
          !bio && !compact && 'items-center',
          !compact && 'flex-col',
          'flex items-center w-full'
        )}
      >
        <RoundedImage
          src={thumbnail ? thumbnail : '/assets/images/UserImages/placeholder.png'}
          className={cn(thumbnailClasses(), 'bg-gray-300')}
          aria-label="Profile Thumbnail"
        />
        <div className="flex flex-col w-full justify-center mx-4 md:mx-0">
          <h1
            className={cn(
              (bio || compact) && 'md:text-left',
              compact ? 'text-sm lg:text-lg md:ml-4' : 'text-2xl md:text-xl text-center',
              'font-bold mt-2'
            )}
          >
            {displayName}
          </h1>
          <h2
            className={cn(
              (bio || compact) && 'md:text-left',
              compact ? 'text-xs lg:text-sm md:ml-4' : 'text-md md:text-base text-center',
              'text-gray-500 '
            )}
          >
            {title}
          </h2>
        </div>
        <div className="mt-4 hidden md:inline-block">{bio}</div>
      </div>
    </section>
  );
};

export default UserInfo;
