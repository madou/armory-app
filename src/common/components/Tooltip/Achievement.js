// @flow

import T from 'i18n-react';
import Icon from 'common/components/Icon';

import Background from './Background';
import styles from './Skill/styles.less';

const extractTier = (achievement, current) => {
  if (!achievement || !achievement.tiers) {
    return {};
  }

  return achievement.tiers.filter((tier) => tier.count >= current)[0] || {};
};

const AchievementTooltip = ({ data }: any) => {
  const tiers = data ? data.tiers : [];
  const tier = extractTier(data, data.current);

  const currentPoints = tiers && tiers.reduce((total, current, index) => {
    if (!tier) {
      return 0;
    }

    if (tiers.indexOf(tier) <= index) {
      return total + current.points;
    }

    return total;
  }, 0);

  return (
    <Background>
      <div className={styles.title}>{data.name}</div>

      {data.requirement}

      {data.description && (
        <span>
          <br /><br />
          {data.description}
        </span>
      )}

      {data.bits && (
        <span>
          <br /><br />
          {T.translate('words.objectives')}: {data.userBits ? data.userBits.length : 0}/{data.bits.length}
        </span>
      )}

      {tiers && (
        <span>
          <br /><br />
          Tier {tiers.indexOf(tier) + 1} of {tiers.length}
        </span>
      )}

      <br /><br />
      <span className={styles.vertical}>
        {currentPoints} <Icon sizePx={32} name="arenanet-points.png" />
      </span>
    </Background>
  );
};

export default AchievementTooltip;