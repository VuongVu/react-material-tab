import React, { PureComponent, forwardRef } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import { move } from 'lodash';

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

const DraggableTab = SortableElement(({ label, value, closable, handleDelete }) => (
    <div style={{ position: 'relative' }}>
        <Tab label={label} {...a11yProps(value)} value={value} />
        {closable && (
            <IconButton onMouseDown={(event) => handleDelete(event, value)}>
                <CloseIcon fontSize="small" />
            </IconButton>
        )}
    </div>
));

const DraggableTabContainer = SortableContainer(({ value, tabItems, handleDelete }) => (
    <Tabs value={value} indicatorColor="primary" textColor="primary" variant="scrollable" scrollButtons="auto">
        {tabItems.map((item, index) => (
            <DraggableTab
                key={index}
                index={index}
                label={item.title}
                value={item.id}
                closable={tabItems.length > 1}
                handleDelete={handleDelete}
            />
        ))}
    </Tabs>
));

class App extends PureComponent {
    state = {
        tabActiveValue: 0,
        tabItems: [
            { id: 0, title: 'Item 0' },
            { id: 1, title: 'Item 1' },
            { id: 2, title: 'Item 2' },
            { id: 3, title: 'Item 3' },
            { id: 4, title: 'Item 4' },
            { id: 5, title: 'Item 5' },
        ],
    };

    onSortEnd = ({ oldIndex, newIndex }) => {
        const { tabItems, tabActiveValue } = this.state;
        const tabActiveIndex = tabItems.findIndex((item) => item.id === tabActiveValue);
        const newTabItems = arrayMove(tabItems, oldIndex, newIndex);
        this.setState(() => ({ tabItems: newTabItems.filter((item) => !!item) }));

        if (oldIndex === newIndex) {
            if (newIndex === tabItems.length) {
                this.setState({ tabActiveValue: newTabItems[newIndex - 1].id });
            } else {
                this.setState({ tabActiveValue: newTabItems[newIndex].id });
            }
        } else {
            this.setState({ tabActiveValue: newTabItems[newIndex].id });
        }
    };

    handleDelete = (event, id) => {
        event.stopPropagation();
        this.setState(({ tabActiveValue, tabItems }) => {
            const tabActiveIndex = tabItems.findIndex((item) => item.id === tabActiveValue);
            const removeItemIndex = tabItems.findIndex((item) => item.id === id);
            tabItems = [...tabItems.slice(0, removeItemIndex), ...tabItems.slice(removeItemIndex + 1)];

            if (removeItemIndex - 1 >= 0) {
                if (tabActiveIndex === removeItemIndex) {
                    tabActiveValue = tabItems[removeItemIndex - 1].id;
                }
            } else {
                tabActiveValue = tabItems[0].id;
            }

            return { tabActiveValue, tabItems };
        });
    };

    renderTabContent = () => {
        const { tabActiveValue, tabItems } = this.state;
        const activeTab = tabItems.find((item) => item.id === tabActiveValue);
        return (
            <TabPanel value={tabActiveValue} index={tabActiveValue}>
                {activeTab?.title}
            </TabPanel>
        );
    };

    render() {
        const { tabActiveValue, tabItems } = this.state;

        return (
            <div style={{ flexGrow: 1, width: '100%', backgroundColor: '#F5F5F5' }}>
                <AppBar position="static" color="default">
                    <DraggableTabContainer
                        axis="x"
                        lockAxis="x"
                        value={tabActiveValue}
                        onSortEnd={this.onSortEnd}
                        tabItems={tabItems}
                        handleDelete={this.handleDelete}
                    />
                </AppBar>
                {this.renderTabContent()}
            </div>
        );
    }
}

export default App;
