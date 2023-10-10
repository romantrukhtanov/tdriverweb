import React from 'react';
import cn from 'classnames';

import styles from './ResultsIcon.module.scss';

type Props = {
  className?: string;
};

export function ResultsIcon({ className }: Props) {
  return (
    <svg
      className={cn(styles.root, className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 350 350"
      width="350"
      height="350"
      fill="none"
    >
      <path
        fill="currentColor"
        d="M277.416 224.692h-43.579c-18.596 0-22.164-3.129-22.164-8.138 0-5.715 9.303-15.734 11.44-19.312 2.157-3.578 15.733-15.734 18.595-33.625 2.863-17.869-18.595-30.75-25.741-18.585-4.24 7.221-15.018 28.604-27.889 37.908-23.883 17.25-43.632 54.805-68.519 54.805v80.953c20.497 0 66.96 22.782 83.409 26.083 18.639 3.727 42.981 11.963 55.905-5.587 7.968-10.82 20.455-39.958 29.822-69.758 23.777-22.836 7.36-44.744-11.279-44.744ZM243.247 72.732h-5.116v41.891h5.116V72.732ZM254.409 128.231l5.127-.022-.182-41.88-5.127.01.182 41.892ZM49.48 258.851v68.68c0 10.072 8.171 18.244 18.254 18.244h21.779c6.708 0 12.166-5.437 12.166-12.155v-93.012H67.734c-10.083 0-18.254 8.171-18.254 18.243ZM242.125 29.44c.182.3.406.577.673.834.245.245.545.448.844.619.309.15.641.267.95.32.321.044.631.054.908-.02l6.046-1.379 2.531 4.39c.844 1.474 1.901 2.81 3.076 4.005 1.176 1.165 2.468 2.169 3.814 2.949 1.346.78 2.755 1.346 4.101 1.645 1.356.299 2.681.32 3.877.064 1.208-.289 2.169-.855 2.895-1.635.748-.79 1.228-1.783 1.452-2.937.236-1.143.214-2.436-.074-3.824-.289-1.356-.855-2.82-1.698-4.283l-4.476-7.765a4.001 4.001 0 0 0-.662-.823 2.992 2.992 0 0 0-.865-.598c-.3-.17-.62-.267-.929-.33a2.597 2.597 0 0 0-.908 0l-21.395 4.913c-.299.074-.534.192-.715.363-.182.17-.321.395-.396.641a2.057 2.057 0 0 0-.043.812c.043.289.16.61.353.908l.641 1.131Zm22.27-2.595 2.543 4.39c.395.695.662 1.389.812 2.04.128.642.139 1.26.021 1.806a2.625 2.625 0 0 1-.684 1.388c-.341.374-.812.641-1.367.78-.577.139-1.196.118-1.847-.032a6.495 6.495 0 0 1-1.945-.79c-.619-.353-1.239-.844-1.805-1.4a8.543 8.543 0 0 1-1.442-1.88l-2.542-4.39 8.256-1.912Z"
      />
      <path
        fill="currentColor"
        d="M235.364 59.946c9.421 8.224 20.893 13.127 30.676 13.127 6.569 0 11.931-2.147 15.456-6.217l7.808-8.95c4.465-5.107 5.512-12.615 2.948-21.139-2.51-8.374-8.225-16.78-16.086-23.637C266.735 4.916 255.264.003 245.479.003c-6.579 0-11.931 2.158-15.466 6.217l-7.787 8.951c-4.454 5.116-5.512 12.625-2.959 21.138 2.522 8.384 8.225 16.78 16.097 23.637Zm-.128-49.176c2.222-2.531 5.747-3.877 10.212-3.877 8.032 0 18.051 4.39 26.158 11.45 6.473 5.64 11.333 12.486 13.683 19.28 2.307 6.622 1.88 12.219-1.196 15.743-2.211 2.532-5.747 3.877-10.212 3.877-8.032 0-18.062-4.39-26.179-11.46-6.462-5.63-11.323-12.465-13.672-19.27-2.287-6.621-1.87-12.218 1.206-15.743Z"
      />
    </svg>
  );
}
