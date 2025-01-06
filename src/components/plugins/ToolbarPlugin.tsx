/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */
import {useLexicalComposerContext} from '@lexical/react/LexicalComposerContext';
import {mergeRegister} from '@lexical/utils';
import {
  $getSelection,
  $isRangeSelection,
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  DRAGOVER_COMMAND,
  DRAGSTART_COMMAND,
  DROP_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  FORMAT_TEXT_COMMAND,
  INDENT_CONTENT_COMMAND,
  REDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  UNDO_COMMAND,
} from 'lexical';
import {useCallback, useEffect, useRef, useState} from 'react';

import * as React from 'react';

const LowPriority = 1;

function Divider() {
  return <div className="divider" />;
}

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const toolbarRef = useRef(null);
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrikethrough, setIsStrikethrough] = useState(false);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      // Update text format
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
      setIsStrikethrough(selection.hasFormat('strikethrough'));
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({editorState}) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        (_payload, _newEditor) => {
          updateToolbar();
          return false;
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        LowPriority,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        LowPriority,
      ),
      editor.registerCommand(
        DRAGSTART_COMMAND,
        (dragEvent) => {
          if (!dragEvent || !dragEvent.dataTransfer) return false;
      
          // Collect data to be dragged (e.g., selected text or custom content)
          const selection = window.getSelection();
          if (selection) {
            const data = selection.toString();
            dragEvent.dataTransfer.setData('text/plain', data);
            console.log('Data set for drag:', data);
          }
      
          return true;
        },
        LowPriority
      ),
      editor.registerCommand(
        DRAGOVER_COMMAND,
        (dragEvent) => {
          if (!dragEvent) return false;
      
          // Example: Check if drag data matches allowed format
          if (dragEvent.dataTransfer) {
            const data = dragEvent.dataTransfer.getData('text/plain');
            console.log('Data dragged over:', data);
      
            // Optionally prevent the default to allow drop
            dragEvent.preventDefault();
          }
      
          return true;
        },
        LowPriority
      )
    );
  }, [editor, updateToolbar]);

  return (
    <div className="toolbar" ref={toolbarRef}>
      <button
        disabled={!canUndo}
        onClick={() => {
          editor.dispatchCommand(UNDO_COMMAND, undefined);
        }}
        className="toolbar-item spaced"
        aria-label="Undo">
        <i className="format undo" />
      </button>
      <button
        disabled={!canRedo}
        onClick={() => {
          editor.dispatchCommand(REDO_COMMAND, undefined);
        }}
        className="toolbar-item"
        aria-label="Redo">
        <i className="format redo" />
      </button>
      <Divider />
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold');
        }}
        className={'toolbar-item spaced ' + (isBold ? 'active' : '')}
        aria-label="Format Bold">
        <i className="format bold" />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic');
        }}
        className={'toolbar-item spaced ' + (isItalic ? 'active' : '')}
        aria-label="Format Italics">
        <i className="format italic" />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline');
        }}
        className={'toolbar-item spaced ' + (isUnderline ? 'active' : '')}
        aria-label="Format Underline">
        <i className="format underline" />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'strikethrough');
        }}
        className={'toolbar-item spaced ' + (isStrikethrough ? 'active' : '')}
        aria-label="Format Strikethrough">
        <i className="format strikethrough" />
      </button>
      <Divider />
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left');
        }}
        className="toolbar-item spaced"
        aria-label="Left Align">
        <i className="format left-align" />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center');
        }}
        className="toolbar-item spaced"
        aria-label="Center Align">
        <i className="format center-align" />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right');
        }}
        className="toolbar-item spaced"
        aria-label="Right Align">
        <i className="format right-align" />
      </button>
      <button
        onClick={() => {
          editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'justify');
        }}
        className="toolbar-item"
        aria-label="Justify Align">
        <i className="format justify-align" />
      </button>{' '}
      <button
        onClick={() => {
          editor.dispatchCommand(INDENT_CONTENT_COMMAND, undefined);
        }}
        className="toolbar-item spaced"
        aria-label="Indent">
        <i className="format indent" />
      </button>
      <button
        onClick={() => {
        // Mock a DragEvent object
        const dragEvent = new DragEvent('dragstart', {
        bubbles: true,
        cancelable: true,
      });

      // Optionally, add dataTransfer data
      if (dragEvent.dataTransfer) {
        dragEvent.dataTransfer.setData('text/plain', 'Dragged data');
      }

        editor.dispatchCommand(DRAGSTART_COMMAND, dragEvent);
       }}
        className="toolbar-item spaced"
        aria-label="Drag Start">
        <i className="format drag-start" />
      </button>
      <button
        onClick={() => {
        // Mock a DragEvent object
        const dragOverEvent = new DragEvent('dragstart', {
        bubbles: true,
        cancelable: true,
      });

      // Optionally, add dataTransfer data
      if (dragOverEvent.dataTransfer) {
        dragOverEvent.dataTransfer.setData('text/plain', 'Dragged data');
      }

        editor.dispatchCommand(DRAGOVER_COMMAND, dragOverEvent);
       }}
        className="toolbar-item spaced"
        aria-label="Drag Over">
        <i className="format drag-over" />
      </button>
      <button
        onClick={() => {
        const dropEvent = new DragEvent('drop', { bubbles: true });
        editor.dispatchCommand(DROP_COMMAND, dropEvent);
      }}
        className="toolbar-item spaced"
        aria-label="Drop"
      >
      <i className="format drop" />
      </button>
    </div>
  );
}
