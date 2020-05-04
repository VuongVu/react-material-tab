import React, { PureComponent, forwardRef } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import arrayMove from 'array-move';

const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}>
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
};

const a11yProps = (index) => {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
};

const CloseTabWrapper = () =>
    forwardRef((props, ref) => (
        <div ref={ref}>
            <IconButton onClick={() => console.log('Delete item ')}>
                <CloseIcon fontSize="small" />
            </IconButton>
        </div>
    ));

const DraggableTab = SortableElement(({ label, id }) => <Tab label={label} {...a11yProps(id)} component={CloseTabWrapper()} />);

const DraggableTabContainer = SortableContainer(({ value, tabItems }) => (
    <Tabs value={value} indicatorColor="primary" textColor="primary" variant="scrollable" scrollButtons="auto">
        {tabItems.map((item, index) => (
            <DraggableTab key={index} index={index} label={item.title} id={item.id} />
        ))}
    </Tabs>
));

class App extends PureComponent {
    state = {
        tabActiveIndex: 0,
        tabItems: [
            { id: 0, title: 'Item 1' },
            { id: 1, title: 'Item 2' },
            { id: 2, title: 'Item 3' },
            { id: 3, title: 'Item 4' },
            { id: 4, title: 'Item 5' },
            { id: 5, title: 'Item 6' },
            { id: 6, title: 'Item 7' },
        ],
        tabContents: [
            { id: 0, title: 'Item 1' },
            { id: 1, title: 'Item 2' },
            { id: 2, title: 'Item 3' },
            { id: 3, title: 'Item 4' },
            { id: 4, title: 'Item 5' },
            { id: 5, title: 'Item 6' },
            { id: 6, title: 'Item 7' },
        ],
    };

    onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ tabItems }) => ({
            tabItems: arrayMove(tabItems, oldIndex, newIndex),
        }));
        if (newIndex !== this.state.tabActiveIndex) {
            this.setState({ tabActiveIndex: newIndex });
        }
    };

    renderTabContent = () => {
        const { tabActiveIndex, tabContents } = this.state;
        const activeTab = tabContents.find((item) => item.id === tabActiveIndex);

        return (
            <TabPanel value={tabActiveIndex} index={tabActiveIndex}>
                {activeTab.title}
            </TabPanel>
        );
    };

    render() {
        const { tabActiveIndex, tabItems } = this.state;

        return (
            <div style={{ flexGrow: 1, width: '100%', backgroundColor: '#F5F5F5' }}>
                <AppBar position="static" color="default">
                    <DraggableTabContainer axis="x" lockAxis="x" value={tabActiveIndex} onSortEnd={this.onSortEnd} tabItems={tabItems} />
                </AppBar>
                {this.renderTabContent()}
            </div>
        );
    }
}

export default App;
