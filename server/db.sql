--
-- PostgreSQL database dump
-- pg_dump -U tpl1222_1 -d finance -f db.sql

-- Dumped from database version 15.4
-- Dumped by pg_dump version 15.6 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: goal; Type: TABLE; Schema: public; Owner: tpl1222_1
--

CREATE TABLE public.goal (
    goal_id integer NOT NULL,
    user_id integer,
    goal character varying(255) NOT NULL,
    amount integer NOT NULL
);


ALTER TABLE public.goal OWNER TO tpl1222_1;

--
-- Name: goal_goal_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl1222_1
--

CREATE SEQUENCE public.goal_goal_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.goal_goal_id_seq OWNER TO tpl1222_1;

--
-- Name: goal_goal_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl1222_1
--

ALTER SEQUENCE public.goal_goal_id_seq OWNED BY public.goal.goal_id;


--
-- Name: transactions; Type: TABLE; Schema: public; Owner: tpl1222_1
--

CREATE TABLE public.transactions (
    transaction_id integer NOT NULL,
    type character varying(255) NOT NULL,
    user_id integer,
    amount integer,
    month character varying(255),
    year integer
);


ALTER TABLE public.transactions OWNER TO tpl1222_1;

--
-- Name: transactions_transaction_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl1222_1
--

CREATE SEQUENCE public.transactions_transaction_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.transactions_transaction_id_seq OWNER TO tpl1222_1;

--
-- Name: transactions_transaction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl1222_1
--

ALTER SEQUENCE public.transactions_transaction_id_seq OWNED BY public.transactions.transaction_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: tpl1222_1
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    email character varying(255) NOT NULL
);


ALTER TABLE public.users OWNER TO tpl1222_1;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl1222_1
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO tpl1222_1;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl1222_1
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: goal goal_id; Type: DEFAULT; Schema: public; Owner: tpl1222_1
--

ALTER TABLE ONLY public.goal ALTER COLUMN goal_id SET DEFAULT nextval('public.goal_goal_id_seq'::regclass);


--
-- Name: transactions transaction_id; Type: DEFAULT; Schema: public; Owner: tpl1222_1
--

ALTER TABLE ONLY public.transactions ALTER COLUMN transaction_id SET DEFAULT nextval('public.transactions_transaction_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: tpl1222_1
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: goal; Type: TABLE DATA; Schema: public; Owner: tpl1222_1
--

COPY public.goal (goal_id, user_id, goal, amount) FROM stdin;
3	1	Vocation	6000
\.


--
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: tpl1222_1
--

COPY public.transactions (transaction_id, type, user_id, amount, month, year) FROM stdin;
1	expense	1	50	February	2024
3	income	1	2050	February	2022
5	savings	1	500	February	2024
6	expense	1	2000	February	2021
7	expense	1	2000	February	2021
8	expense	1	2000	February	2024
9	expense	1	450	February	2024
13	income	1	3000	February	2024
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: tpl1222_1
--

COPY public.users (user_id, first_name, last_name, email) FROM stdin;
1	Janet	Jiang	janetjiang1103@gmail.com
\.


--
-- Name: goal_goal_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl1222_1
--

SELECT pg_catalog.setval('public.goal_goal_id_seq', 3, true);


--
-- Name: transactions_transaction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl1222_1
--

SELECT pg_catalog.setval('public.transactions_transaction_id_seq', 13, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl1222_1
--

SELECT pg_catalog.setval('public.users_user_id_seq', 1, true);


--
-- Name: goal goal_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl1222_1
--

ALTER TABLE ONLY public.goal
    ADD CONSTRAINT goal_pkey PRIMARY KEY (goal_id);


--
-- Name: transactions transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl1222_1
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (transaction_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: tpl1222_1
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl1222_1
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: goal goal_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tpl1222_1
--

ALTER TABLE ONLY public.goal
    ADD CONSTRAINT goal_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: transactions transactions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tpl1222_1
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- PostgreSQL database dump complete
--

