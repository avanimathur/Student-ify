
        // Data storage
        let questions = JSON.parse(localStorage.getItem('questions')) || [];
        let answers = JSON.parse(localStorage.getItem('answers')) || [];
        let currentUser = 'user123';

        // Toast configuration
        toastr.options = {
            closeButton: true,
            progressBar: true,
            positionClass: "toast-top-right",
            timeOut: 3000
        };

        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            showAllQuestions();
            
            // Close modals when clicking outside
            document.querySelectorAll('.modal').forEach(modal => {
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        hideModal(modal.id);
                    }
                });
            });
        });

        // Utility functions
        function generateId() {
            return Date.now().toString(36) + Math.random().toString(36).substr(2);
        }

        function saveToLocalStorage() {
            localStorage.setItem('questions', JSON.stringify(questions));
            localStorage.setItem('answers', JSON.stringify(answers));
        }

        function showModal(modalId) {
            document.getElementById(modalId).classList.add('show');
        }

        function hideModal(modalId) {
            document.getElementById(modalId).classList.remove('show');
        }

        function formatDate(dateString) {
            return new Date(dateString).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }

        // Question CRUD operations
        function createQuestion(title, content) {
            if (!title.trim() || !content.trim()) {
                toastr.error('Please fill in all fields');
                return null;
            }

            const question = {
                id: generateId(),
                title: title.trim(),
                content: content.trim(),
                userId: currentUser,
                timestamp: new Date().toISOString()
            };
            questions.unshift(question);
            saveToLocalStorage();
            return question;
        }

        function deleteQuestion(id) {
            const index = questions.findIndex(q => q.id === id);
            if (index !== -1 && questions[index].userId === currentUser) {
                questions.splice(index, 1);
                answers = answers.filter(a => a.questionId !== id);
                saveToLocalStorage();
                toastr.success('Question deleted successfully');
                return true;
            }
            return false;
        }

        // Answer CRUD operations
        function createAnswer(questionId, title, content) {
            if (!title.trim() || !content.trim()) {
                toastr.error('Please fill in all fields');
                return null;
            }

            const answer = {
                id: generateId(),
                questionId: questionId,
                title: title.trim(),
                content: content.trim(),
                userId: currentUser,
                timestamp: new Date().toISOString()
            };
            answers.push(answer);
            saveToLocalStorage();
            return answer;
        }

        function deleteAnswer(id) {
            const index = answers.findIndex(a => a.id === id);
            if (index !== -1 && answers[index].userId === currentUser) {
                answers.splice(index, 1);
                saveToLocalStorage();
                toastr.success('Answer deleted successfully');
                return true;
            }
            return false;
        }

        // UI Functions
        function showAllQuestions() {
            currentTab = 'all';
            document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelector('button[onclick="showAllQuestions()"]').classList.add('active');
            renderQuestions(questions);
        }

        function showMyQuestions() {
            currentTab = 'my';
            document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
            document.querySelector('button[onclick="showMyQuestions()"]').classList.add('active');
            const myQuestions = questions.filter(q => q.userId === currentUser);
            renderQuestions(myQuestions);
        }
        function renderQuestions(questionsToRender) {
            const mainContent = document.getElementById('mainContent');
            
            if (!questionsToRender.length) {
                mainContent.innerHTML = `
                    <div class="no-content">
                        <i class="fas fa-question-circle fa-3x"></i>
                        <p>No questions found. Be the first to ask!</p>
                    </div>`;
                return;
            }

            mainContent.innerHTML = questionsToRender.map(question => {
                const answerCount = answers.filter(a => a.questionId === question.id).length;
                return `
                    <div class="question-card" onclick="showQuestionDetails('${question.id}')">
                        <h3>
                            <i class="fas fa-question-circle"></i>
                            ${question.title}
                        </h3>
                        <p style=" text-overflow: ellipsis; overflow: hidden;">${question.content.substring(0, 150)}${question.content.length > 150 ? '...' : ''}</p>
                        <div style="display: flex; justify-content: space-between; color: var(--text-lighter);">
                            <span><i class="far fa-clock"></i> ${formatDate(question.timestamp)}</span>
                            <span><i class="fas fa-comments"></i> ${answerCount} answer${answerCount !== 1 ? 's' : ''}</span>
                        </div>
                    </div>`;
            }).join('');
        }

        function showCreateQuestion() {
            showModal('createQuestionModal');
            document.getElementById('questionTitle').focus();
        }

        function submitQuestion() {
            const title = document.getElementById('questionTitle').value;
            const content = document.getElementById('questionContent').value;
            
            const question = createQuestion(title, content);
            if (question) {
                hideModal('createQuestionModal');
                document.getElementById('questionTitle').value = '';
                document.getElementById('questionContent').value = '';
                showAllQuestions();
                toastr.success('Question posted successfully!');
            }
        }

             // Update the tab switching functions
        

        // Update showQuestionDetails to include tab awareness
        function showQuestionDetails(questionId) {
            const question = questions.find(q => q.id === questionId);
            if (!question) {
                toastr.error('Question not found');
                return;
            }

            const questionAnswers = answers.filter(a => a.questionId === questionId);
            const modal = document.getElementById('questionDetailsModal');
            
            modal.querySelector('.modal-content').innerHTML = `
                <div class="modal-header">
                    <h2><i class="fas fa-question-circle"></i> ${question.title}</h2>
                    <button onclick="hideModal('questionDetailsModal')" class="action-btn">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div class="question-content">${question.content}</div>
                
                <div style="color: var(--text-lighter); margin-bottom: 20px;">
                    <i class="far fa-clock"></i> Posted on ${formatDate(question.timestamp)}
                    ${currentTab === 'my' && question.userId === currentUser ? `
                        <div class="button-group" style="margin-top: 10px;">
                            <button onclick="confirmDeleteQuestion('${question.id}')" class="action-btn delete-btn">
                                <i class="fas fa-trash"></i> Delete Question
                            </button>
                        </div>
                    ` : ''}
                </div>

                <div class="answers-section">
                    <h3><i class="fas fa-comments"></i> Answers (${questionAnswers.length})</h3>
                    
                    ${questionAnswers.length === 0 ? `
                        <div class="no-content">No answers yet. Be the first to answer!</div>
                    ` : questionAnswers.map(answer => `
                        <div class="answer-card">
                            <h4>${answer.title}</h4>
                            <div class="answer-content">${answer.content}</div>
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 15px;">
                                <span style="color: var(--text-lighter);">
                                    <i class="far fa-clock"></i> ${formatDate(answer.timestamp)}
                                </span>
                                ${answer.userId === currentUser ? `
                                    <button onclick="confirmDeleteAnswer('${answer.id}')" class="action-btn delete-btn">
                                        <i class="fas fa-trash"></i> Delete
                                    </button>
                                ` : ''}
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="answer-form">
                    <h4><i class="fas fa-reply"></i> Your Answer</h4>
                    <input type="text" id="answerTitle" placeholder="Answer Title" class="input-field" maxlength="100">
                    <textarea id="answerContent" placeholder="Write your answer..." class="input-field" maxlength="2000"></textarea>
                    <div class="button-group">
                        <button onclick="submitAnswer('${questionId}')" class="action-btn submit-btn">
                            <i class="fas fa-paper-plane"></i> Submit Answer
                        </button>
                    </div>
                </div>
            `;

            showModal('questionDetailsModal');
        }

        function submitAnswer(questionId) {
            const title = document.getElementById('answerTitle').value;
            const content = document.getElementById('answerContent').value;
            
            const answer = createAnswer(questionId, title, content);
            if (answer) {
                document.getElementById('answerTitle').value = '';
                document.getElementById('answerContent').value = '';
                showQuestionDetails(questionId);
                toastr.success('Answer posted successfully!');
            }
        }

        function confirmDeleteQuestion(questionId) {
            const confirmationHTML = `
                <div class="confirmation-backdrop"></div>
                <div class="confirmation-dialog">
                    <h3 style="color: var(--danger-color);">Delete Question</h3>
                    <p>Are you sure you want to delete this question? This action cannot be undone and will delete all associated answers.</p>
                    <div class="button-group">
                        <button onclick="removeConfirmationDialog()" class="action-btn">Cancel</button>
                        <button onclick="executeDeleteQuestion('${questionId}')" class="action-btn delete-btn">Delete</button>
                    </div>
                </div>
            `;
            
            document.body.insertAdjacentHTML('beforeend', confirmationHTML);
        }

        function confirmDeleteAnswer(answerId) {
            const confirmationHTML = `
                <div class="confirmation-backdrop"></div>
                <div class="confirmation-dialog">
                    <h3 style="color: var(--danger-color);">Delete Answer</h3>
                    <p>Are you sure you want to delete this answer? This action cannot be undone.</p>
                    <div class="button-group">
                        <button onclick="removeConfirmationDialog()" class="action-btn">Cancel</button>
                        <button onclick="executeDeleteAnswer('${answerId}')" class="action-btn delete-btn">Delete</button>
                    </div>
                </div>
            `;
            
            document.body.insertAdjacentHTML('beforeend', confirmationHTML);
        }

        function removeConfirmationDialog() {
            document.querySelector('.confirmation-backdrop')?.remove();
            document.querySelector('.confirmation-dialog')?.remove();
        }

        function executeDeleteQuestion(questionId) {
            if (deleteQuestion(questionId)) {
                removeConfirmationDialog();
                hideModal('questionDetailsModal');
                showAllQuestions();
            }
        }

        function executeDeleteAnswer(answerId) {
            const answer = answers.find(a => a.id === answerId);
            if (deleteAnswer(answerId)) {
                removeConfirmationDialog();
                if (answer) {
                    showQuestionDetails(answer.questionId);
                }
            }
        }

        
    