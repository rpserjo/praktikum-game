import React, { FC } from 'react';

const icons: Record<string, string> = {
    enterFullScreen:
        'M200-200v-193h60v133h133v60H200Zm0-367v-193h193v60H260v133h-60Zm367 367v-60h133v-133h60v193H567Zm133-367v-133H567v-60h193v193h-60Z',
    exitFullScreen:
        'M333-200v-133H200v-60h193v193h-60Zm234 0v-193h193v60H627v133h-60ZM200-567v-60h133v-133h60v193H200Zm367 0v-193h60v133h133v60H567Z',
};

type TIconProps = {
    iconName: string;
};
const Icon: FC<TIconProps> = ({ iconName }) => {
    const icon = icons[iconName];
    return (
        <svg xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48">
            <path d={icon} />
        </svg>
    );
};

export default Icon;
