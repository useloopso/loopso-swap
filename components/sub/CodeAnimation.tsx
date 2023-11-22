import React, {FC, useState, useEffect} from 'react'
import Highlight, {defaultProps} from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/nightOwl'

interface CodeProps {
    code: string
    show: boolean
    newTextToWrite?: string
    codeLast?: string
    animationDelay?: number
    animated?: boolean
    maxHeight?: number
}

const CodeAnimation: FC<CodeProps> = ({
    code,
    show,
    newTextToWrite,
    codeLast,
    animationDelay,
    animated,
    maxHeight
}) => {
    const initialText = codeLast ? code + codeLast : code
    const [text, setText] = useState(animated ? '' : initialText)

    const animateText = (targetText: string) => {
        let i = 0;
        const intervalId = setInterval(() => {
            setText(targetText.slice(0, i))
            i++
            if (i > targetText.length) {
                clearInterval(intervalId)
            }
        }, 30);
    };

    useEffect(() => {
        if (show && animated) {
            setTimeout(() => {
                animateText(initialText);
            }, animationDelay ? animationDelay : 150);
        }
    }, [initialText, show, animated, animationDelay]);

    useEffect(() => {
        if (newTextToWrite) {
            setTimeout(() => {
                animateText(code + newTextToWrite + (codeLast ? codeLast : ''));
            }, 0);
        }
    }, [newTextToWrite, code, codeLast]);
  return (
    <Highlight {...defaultProps} code={text} language='tsx' theme={theme}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <pre className={className + 'transition-all duration-700 no-scrollbar'}
>
                {tokens.map((line, i) => (
                    <div {...getLineProps({ line, key: line.join('') })}  key={line.join('')}>
                        {line.map((token, key) => (
                            <span {...getTokenProps({ token, key })} key={key} />
                        ))}
                    </div>
                ))}
            </pre>
        )}
    </Highlight>
  )
}

export default CodeAnimation
