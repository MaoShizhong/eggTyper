import randQuote from "quote-library";

export class Words {
    static words500NoCaps = [
        'the', 'be', 'of', 'you', 'it', 'have', 'to', 'for', 'do', 'he', 'with', 'on', 'this', 'not', 'field',
        'we', 'that', 'develop', 'but', 'they', 'say', 'at', 'what', 'his', 'from', 'go', 'or', 'by', 'get',
        'she', 'my', 'can', 'know', 'if', 'me', 'your', 'all', 'who', 'their', 'will', 'would', 'make', 'just',
        'up', 'think', 'time', 'see', 'her', 'as', 'one', 'come', 'people', 'take', 'year', 'him', 'them', 'reach',
        'some', 'want', 'how', 'which', 'now', 'like', 'other', 'could', 'our', 'into', 'here', 'then', 'than',
        'look', 'way', 'these', 'thing', 'well', 'because', 'also', 'two', 'use', 'tell', 'good', 'first', 'and',
        'man', 'day', 'find', 'give', 'more', 'new', 'us', 'any', 'those', 'very', 'need', 'there', 'should',
        'even', 'only', 'many', 'really', 'work', 'life', 'why', 'alright', 'down', 'try', 'let', 'something',
        'too', 'call', 'woman', 'may', 'still', 'through', 'mean', 'after', 'never', 'world', 'in', 'learn',
        'yeah', 'great', 'last', 'child', 'over', 'ask', 'when', 'simply', 'school', 'state', 'talk', 'feel',
        'keep', 'leave', 'put', 'help', 'big', 'same', 'own', 'while', 'start', 'three', 'high', 'every', 'out',
        'another', 'become', 'most', 'between', 'happen', 'family', 'president', 'old', 'yes', 'house', 'show',
        'again', 'student', 'so', 'seem', 'might', 'part', 'hear', 'its', 'place', 'problem', 'where', 'believe',
        'country', 'always', 'week', 'point', 'hand', 'off', 'play', 'turn', 'few', 'group', 'such', 'against',
        'run', 'guy', 'about', 'case', 'question', 'night', 'live', 'game', 'number', 'write', 'bring', 'without',
        'money', 'lot', 'book', 'system', 'government', 'next', 'city', 'company', 'story', 'today', 'job', 'move',
        'must', 'bad', 'friend', 'during', 'begin', 'love', 'each', 'hold', 'different', 'comment', 'little', 'ever',
        'word', 'fact', 'read', 'anything', 'nothing', 'sure', 'small', 'month', 'program', 'maybe', 'right', 'under',
        'business', 'kind', 'stop', 'pay', 'study', 'since', 'issue', 'name', 'idea', 'room', 'percent', 'far', 'away',
        'law', 'actually', 'large', 'though', 'provide', 'lose', 'power', 'kid', 'war', 'understand', 'head', 'mother',
        'real', 'best', 'team', 'eye', 'long', 'doctor', 'side', 'water', 'young', 'wait', 'okay', 'both', 'yet', 'meet',
        'service', 'area', 'important', 'person', 'voice', 'thank', 'much', 'someone', 'end', 'however', 'hour', 'film',
        'national', 'four', 'line', 'girl', 'around', 'watch', 'until', 'father', 'sit', 'create', 'information', 'car',
        'least', 'already', 'kill', 'minute', 'party', 'include', 'stand', 'together', 'back', 'follow', 'health', 'win',
        'remember', 'often', 'reason', 'speak', 'ago', 'set', 'black', 'member', 'community', 'once', 'social', 'news',
        'allow', 'body', 'lead', 'continue', 'whether', 'enough', 'spend', 'level', 'able', 'political', 'almost', 'boy',
        'university', 'before', 'stay', 'add', 'later', 'change', 'five', 'probably', 'center', 'among', 'face', 'public',
        'die', 'food', 'else', 'history', 'buy', 'result', 'morning', 'parent', 'office', 'course', 'send', 'research',
        'walk', 'door', 'white', 'several', 'court', 'home', 'grow', 'better', 'open', 'moment', 'including', 'seven',
        'within', 'second', 'late', 'street', 'free', 'everyone', 'policy', 'table', 'sorry', 'care', 'low', 'build',
        'human', 'please', 'hope', 'process', 'teacher', 'data', 'offer', 'death', 'whole', 'cat', 'plan', 'easy',
        'education', 'expect', 'fall', 'himself', 'age', 'hard', 'sense', 'across', 'early', 'college', 'finally',
        'music', 'dog', 'mind', 'class', 'police', 'effect', 'season', 'tax', 'heart', 'son', 'art', 'possible',
        'serve', 'break', 'although', 'market', 'air', 'force', 'require', 'foot', 'listen', 'agree', 'everything',
        'according', 'anyone', 'baby', 'wrong', 'cut', 'decide', 'full', 'behind', 'pass', 'interest', 'development',
        'sometimes', 'security', 'eat', 'report', 'control', 'rate', 'local', 'suggest', 'nation', 'sell', 'action',
        'support', 'wife', 'decision', 'receive', 'value', 'base', 'pick', 'phone', 'thanks', 'event', 'drive', 'strong',
        'remain', 'explain', 'site', 'hit', 'pull', 'church', 'model', 'perhaps', 'relationship', 'six', 'fine', 'movie',
        'raise', 'less', 'player', 'couple', 'million', 'themselves', 'record', 'especially', 'difference', 'light',
        'federal', 'former', 'role', 'pretty', 'myself', 'view', 'price', 'effort', 'nice', 'quite', 'along', 'location',
        'pet', 'either', 'toward', 'leader', 'photo', 'wear', 'space', 'project', 'return', 'close',
        'special', 'field',
    ];

    static get words500FirstCaps() {
        return this.words500NoCaps.map(word => word[0].toUpperCase() + word.slice(1));
    }

    static get words500MixedFirstCaps() {
        return this.words500NoCaps.map(word => (Math.random() > 0.5) ? word[0].toUpperCase() + word.slice(1) : word);
    }

    static get randomQuote() {
        const quote = [];
        do {
            quote.push(randQuote.randomQuote().quoteText);
        } while (quote.length < 25);
        return quote;
    }
}