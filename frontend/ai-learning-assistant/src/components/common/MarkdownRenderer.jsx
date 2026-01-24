import ReactMarkdown from "react-markdown";//react-markdown is used when you want Markdown content to behave like real React UI, not just text.
import remarkGfm from "remark-gfm";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {dracula} from "react-syntax-highlighter/dist/esm/styles/prism";
import { Children } from "react";

const MarkdownRenderer = ({content}) => {
  return (
    <div className="">
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}//Parse my markdown the same way GitHub does.
            components={{
                h1: ({node,...props}) => <h1 className="" {...props} />,
                h2: ({node,...props}) => <h2 className="" {...props} />,
                h3: ({node,...props}) => <h3 className="" {...props} />,
                h4: ({node,...props}) => <h4 className="" {...props} />,
                p: ({node,...props}) => <p className="" {...props} />,
                a: ({node,...props}) => <a className="" {...props} />,
                ul: ({node,...props}) => <ul className="" {...props} />,
                ol: ({node,...props}) => <ol className="" {...props} />,
                li: ({node,...props}) => <li className="" {...props} />,
                strong: ({node,...props}) => <strong className="" {...props} />,
                blockquote: ({node,...props}) => <blockquote className="" {...props} />,
                code: ({node,inline,className,children,...props}) => {
                    const match = /language-(\w+)/.exec(className || '');//Extracts the programming language from className
                    return !inline && match ? (
                        <SyntaxHighlighter
                            style={dracula}
                            language={match[1]}
                            PreTag="div"
                            {...props}
                        >
                            {String(children).replace(/\n$/,'')} {/*Converts code to string and removes trailing newline */}
                        </SyntaxHighlighter>
                    ) : (
                        <code className="" {...props}>
                            {children}
                        </code>
                    );
                },
                pre: ({node,...props}) => <pre className="" {...props}/>,
            }}
        >
            {content}
        </ReactMarkdown>
    </div>
  )
}

export default MarkdownRenderer