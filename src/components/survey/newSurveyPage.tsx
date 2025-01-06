/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
//import * as React from 'react';
//import {AutoFocusPlugin} from '@lexical/react/LexicalAutoFocusPlugin';
//import {HistoryPlugin} from '@lexical/react/LexicalHistoryPlugin';
import { useState} from 'react';
import {$getRoot, $createParagraphNode, $createTextNode} from 'lexical';
import * as Y from 'yjs';
import {LexicalComposer} from '@lexical/react/LexicalComposer';
import {ContentEditable} from '@lexical/react/LexicalContentEditable';
import {RichTextPlugin} from '@lexical/react/LexicalRichTextPlugin';
import {Provider} from '@lexical/yjs';
import {WebsocketProvider} from 'y-websocket';
import {CollaborationPlugin} from "@lexical/react/LexicalCollaborationPlugin";
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import React from "react";
import './styles.css';

import PubNub from './Pubnub.ts';

import ToolbarPlugin from '../plugins/ToolbarPlugin.tsx';

import { ResizableBox } from "react-resizable";

import 'react-resizable/css/styles.css';

import { useNavigate } from 'react-router-dom';

/*function Placeholder() {
  return <div className="editor-placeholder"></div>;
}*/
const width = window.innerWidth - 10;
const height = window.innerHeight;

const editorConfig = {
  editorState: null,
  namespace: 'documentID-223-policy-management-doc',
  //nodes: [],
  // Handling of errors during update
  onError(error: Error) {
    throw error;
  },
  // The editor theme
  
};
const pubnubConfig = {
  endpoint: "wss://v6.pubnub3.com",
  channel: editorConfig.namespace,
  auth: '',
  username: 'user-' + Math.random().toString(36).substr(2, 4),
  userId: 'user-id-' + Math.random().toString(36).substr(2, 9),
  publishKey: 'pub-c-46752c06-6fcc-455c-8447-179714574e74',
  subscribeKey: 'sub-c-2c11d42e-12db-11e4-897a-02ee2ddab7fe',
};

// TODO Optionally load additional content
function initialEditorState(): void {
  const root = $getRoot();
  const paragraph = $createParagraphNode();
  const text = $createTextNode(''); 
  paragraph.append(text);
  root.append(paragraph);
}

//reusable editor component
function EditorInstance(){
  return (
    <ResizableBox
      width={500} // Default width
      height={400} // Default height
      minConstraints={[100]} // Minimum size [width, height]
      maxConstraints={[width]} // Maximum size [width, height]
      resizeHandles={["e"]} // Resize handles (south, east, southeast)
      axis="both" 
    >
    <LexicalComposer initialConfig={editorConfig}>
      <div className="editor-container">
        <ToolbarPlugin />
        <div id="yjs-collaboration-plugin-container" className="editor-inner">
          <RichTextPlugin
            contentEditable={<ContentEditable className="editor-input" />}
            placeholder={<span></span>}
            ErrorBoundary={LexicalErrorBoundary}
          />
          <CollaborationPlugin
            // cursorColor="rgba(255, 0, 255, 0.5)"
            // cursorsContainerRef={document.getElementById('#yjs-collaboration-plugin-container')}
            // username={pubnubConfig.username}
            providerFactory={(id, yjsDocMap) => {
              const doc = new Y.Doc();
              yjsDocMap.set(id, doc);
              const provider = new WebsocketProvider(
                pubnubConfig.endpoint, id, doc, {
                  WebSocketPolyfill: PubNub as unknown as typeof WebSocket,
                  params: pubnubConfig,
              }) as unknown as Provider;
              return provider;
            }}
            id="yjs-collaboration-plugin"
            initialEditorState={initialEditorState}
            shouldBootstrap={false}
          />
        </div>
      </div>
    </LexicalComposer>
    </ResizableBox>
  );
}

export default function NewSurvey() {
  const [instances, setInstances] = useState([1]);

  const addEditorInstance = () => {
    setInstances([...instances, instances.length + 1]);
  }

  const deleteEditorInstance = () => {
    setInstances(instances.slice(0, -1)); // Removes the last instance
  }

  const navigate = useNavigate();

  const navigateToHome = () => {
    navigate('/');
  };
  
  return (
    <div>
      <button onClick={navigateToHome} >Home</button>
      <button onClick={addEditorInstance}>Add New Editor Block</button>
      {instances.map((_, index) => (
        <EditorInstance key = {index} />
      ))}

      <button onClick={deleteEditorInstance}> Delete Editor Block</button>
    </div>
  );
}
