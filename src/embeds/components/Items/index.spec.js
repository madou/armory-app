import { mount } from 'enzyme';
import { createStubComponent, stubRedux, stubStyles } from 'test/utils';

const styles = stubStyles([
  'item',
]);

const sandbox = sinon.sandbox.create();
const applyAttributes = sandbox.stub();
const Item = createStubComponent('Item');
const actions = {
  fetchItems: sandbox.spy(),
  fetchItemStats: sandbox.spy(),
};

const ItemsEmbed = proxyquire('embeds/components/Items', {
  ...stubRedux,
  'features/Gw2/actions': actions,
  'features/Character/components/Item': Item,
  'lib/gw2/itemStats': applyAttributes,
  './styles.less': styles,
});

describe('<Items /> embed', () => {
  const props = {
    ...actions,
    className: 'cool-class',
    ids: [1, 2, -1],
    statIds: {
      4: 5,
    },
    optionalText: 'optional_text',
    mode: 'item',
    items: {
      2: {
        details: {},
      },
    },
  };

  let wrapper;

  beforeEach(() => {
    wrapper = mount(<ItemsEmbed {...props} />);
  });

  context('when mounting', () => {
    it('should fetch items', () => {
      expect(actions.fetchItems).to.have.been.calledWith(props.ids);
    });

    it('should fetch itemStats', () => {
      expect(actions.fetchItemStats).to.have.been.calledWith(
        Object.values(props.statIds).map((id) => +id)
      );
    });
  });

  describe('rendering', () => {
    it('should set classname', () => {
      expect(wrapper).to.have.className(props.className);
    });

    it('should render nothing for items that have no data', () => {
      expect(wrapper.children()).to.have.length(2);
    });

    it('should render items', () => {
      const expectedItems = [
        <Item
          item={props.items['2']}
          name={undefined}
          tooltipType={undefined}
          className={styles.item}
        />,
        <Item tooltipTextOverride={props.optionalText} />,
      ];

      expect(wrapper.children()).to.have.length(expectedItems.length);

      expectedItems.forEach((jsx, index) => {
        expect(wrapper.children().at(index)).to.contain(jsx);
      });
    });
  });
});