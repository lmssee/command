import { typeOf } from 'a-js-tools';
import { CurrentIssueType } from './types';
import questionData, { originalData } from './questionData';

/**Change the current issue (Every change initializes the `questionData.data`)
 *
 *  变更当前问题（每次变更会初始化  questionData.data）
 *
 *  @param data {@link ParamDataType}
 **/
export default function changeCurrentIssue() {
  const { multi, progressCount } = questionData;
  // 原始问题
  const _d: string | CurrentIssueType = multi
    ? (originalData.data as [])[
        (originalData.data as []).length + progressCount
      ]
    : (originalData.data as string);
  // 初始化一个空白问题
  const _e: CurrentIssueType = {
    text: 'Please change to your own question',
    tip: '',
    type: 'text',
    private: false,
    resultText: '',
  };
  const currentIssue: CurrentIssueType = Object.assign(
    _e,
    typeOf(_d) == 'string' ? { text: _d } : _d,
  );
  // 初始化当前问题
  const type: 0 | 1 = Array.isArray(currentIssue.tip) ? 1 : 0;
  questionData.assign({
    indexOfCursor: 0,
    cursorTranslate: 0,
    type,
    userInput: type == 0 ? [] : [(currentIssue.tip as unknown[])[0]],
    currentIssue,
  });
}
