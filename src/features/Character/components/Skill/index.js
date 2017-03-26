// @flow

import cx from 'classnames';
import get from 'lodash/get';

import TooltipTrigger from 'common/components/TooltipTrigger';
import Icon from 'common/components/Icon';

import EmptySkill from './Empty';
import styles from './styles.less';

type Props = {
  data?: {},
  className?: string,
  tooltipTextOverride?: string,
};

const Skill = ({ data, className, tooltipTextOverride }: Props) => {
  const error = get(data, 'error');

  return (
    <TooltipTrigger type="skill" data={tooltipTextOverride || data || 'No Skill Selected'}>
      {(error || !data)
        ? <EmptySkill />
        : (
          <Icon
            src={get(data, 'icon')}
            size="mediumSmall"
            className={cx(styles.skill, className)}
          />
        )}
    </TooltipTrigger>
  );
};

export default Skill;
