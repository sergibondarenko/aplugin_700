import React, { Component } from 'react';
import {
  EuiPage,
  EuiPageHeader,
  EuiTitle,
  EuiPageBody,
  EuiPageContent,
  EuiPageContentHeader,
  EuiPageContentBody,
  EuiText,
  EuiDragDropContext,
  EuiDraggable,
  EuiDroppable,
  EuiPanel,
  reorder
} from '@elastic/eui';

import { FormattedMessage } from '@kbn/i18n/react';

export class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [
        { id: '0', content: 'first' },
        { id: '1', content: 'second' },
        { id: '2', content: 'third' }
      ]
    };
  }

  onDragEnd = ({ source, destination }) => {
    console.log('FUNC onDragEnd');
    console.log('source', source);
    console.log('destination', destination);
    const { list } = this.state;
    if (source && destination) {
      const reorderedList = reorder(list, source.index, destination.index);
      this.setState({ list: reorderedList });
    }
  };

  componentDidMount() {
    /*
       FOR EXAMPLE PURPOSES ONLY.  There are much better ways to
       manage state and update your UI than this.
    */
    const { httpClient } = this.props;
    httpClient.get('../api/aplugin700/example').then((resp) => {
      this.setState({ time: resp.data.time });
    });
  }

  render() {
    const { list } =  this.state;
    const { title } = this.props;
    return (
      <EuiPage>
        <EuiPageBody>
          <EuiPageHeader>
            <EuiTitle size="l">
              <h1>
                <FormattedMessage
                  id="aplugin700.helloWorldText"
                  defaultMessage="{title} Hello World!"
                  values={{ title }}
                />
              </h1>
            </EuiTitle>
          </EuiPageHeader>
          <EuiPageContent>
            <EuiPageContentHeader>
              <EuiTitle>
                <h2>
                  <FormattedMessage
                    id="aplugin700.congratulationsTitle"
                    defaultMessage="Congratulations"
                  />
                </h2>
              </EuiTitle>
            </EuiPageContentHeader>
            <EuiPageContentBody>
              <EuiText>
                <h3>
                  <FormattedMessage
                    id="aplugin700.congratulationsText"
                    defaultMessage="You have successfully created your first Kibana Plugin!"
                  />
                </h3>
                <p>
                  <FormattedMessage
                    id="aplugin700.serverTimeText"
                    defaultMessage="The server time (via API call) is {time}"
                    values={{ time: this.state.time || 'NO API CALL YET' }}
                  />
                </p>
              </EuiText>
              <EuiDragDropContext onDragEnd={this.onDragEnd}>
                <EuiDroppable droppableId="DROPPABLE_AREA" spacing="m" withPanel>
                  {list.map(({ content, id }, idx) => (
                    <EuiDraggable spacing="m" key={id} index={idx} draggableId={id}>
                      {(provided, state) => (
                        <EuiPanel hasShadow={state.isDragging}>
                          {content}
                          {state.isDragging && ' ✨'}
                        </EuiPanel>
                      )}
                    </EuiDraggable>
                  ))}
                </EuiDroppable>
              </EuiDragDropContext>
            </EuiPageContentBody>
          </EuiPageContent>
        </EuiPageBody>
      </EuiPage>
    );
  }
}
